import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isRateLimited } from '../lib/rate-limit.js';
import {
  checkFormTiming,
  checkHoneypot,
  rejectIfBadEmail,
  rejectIfBadPhone,
  rejectIfGibberish,
  type SpamGuardResult,
} from '../lib/spam-guards.js';
import { sendBrevoEmail } from '../lib/brevo/index.js';
import { createHandler } from '../lib/create-handler.js';
import { TEAM_RECIPIENTS } from '../lib/recipients.js';
import { getClientIp, verifyTurnstile } from '../lib/turnstile.js';
import {
  buildClientConfirmationHtml,
  buildTeamNotificationHtml,
  buildTeamNotificationText,
} from '../templates/new-client.js';
import { REQUIRED_FIELDS, type NewClientFormData } from '../templates/new-client-types.js';

function applyGuard(
  res: VercelResponse,
  result: SpamGuardResult,
): VercelResponse | null {
  if (result.ok) return null;
  if (result.silent) {
    return res.status(200).json({
      success: true,
      message: 'Formulario de nuevo cliente enviado exitosamente',
    });
  }
  return res.status(result.status).json({ error: result.error });
}

export default createHandler(async (req: VercelRequest, res: VercelResponse) => {
  const formData = req.body as Partial<NewClientFormData> & {
    turnstileToken?: string;
    website?: string;
    formLoadedAt?: number | string;
  };

  const honeypot = applyGuard(res, checkHoneypot(formData.website));
  if (honeypot) return honeypot;

  const timing = applyGuard(res, checkFormTiming(formData.formLoadedAt));
  if (timing) return timing;

  const ip = getClientIp(req);
  if (isRateLimited(`send-new-client:${ip ?? 'unknown'}`)) {
    return res.status(429).json({ error: 'Demasiados intentos. Intenta más tarde.' });
  }

  const token = formData.turnstileToken?.trim();
  if (!token) {
    return res.status(403).json({
      error: 'Se requiere verificación de seguridad.',
    });
  }

  const captchaOk = await verifyTurnstile(token, ip);
  if (!captchaOk) {
    return res.status(403).json({
      error: 'Verificación de seguridad inválida. Inténtalo de nuevo.',
    });
  }

  const missingFields = REQUIRED_FIELDS.filter(
    (field) => !formData[field]?.toString().trim(),
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos requeridos',
      missingFields,
    });
  }

  const gibberish = applyGuard(
    res,
    rejectIfGibberish([
      formData.razonSocial,
      formData.nombreFantasia,
      formData.representanteLegal,
      formData.giro,
      formData.plazo,
      formData.direccionComercial,
      formData.comunaComercial,
      formData.ciudadComercial,
      formData.nombreResponsableContabilidad,
      formData.cargoContabilidad,
      formData.comexExportaciones,
      formData.cargoComex,
      formData.gerenteComercial,
      formData.nombreSolicitante,
      formData.rut,
      formData.rutRepresentante,
    ]),
  );
  if (gibberish) return gibberish;

  const emailChecks = [
    rejectIfBadEmail(formData.emailContabilidad),
    rejectIfBadEmail(formData.emailGerente),
  ];
  for (const check of emailChecks) {
    const applied = applyGuard(res, check);
    if (applied) return applied;
  }

  const phoneChecks = [
    rejectIfBadPhone(formData.fonoContabilidad),
    rejectIfBadPhone(formData.fonoGerente),
    rejectIfBadPhone(formData.celularSolicitante),
  ];
  for (const check of phoneChecks) {
    const applied = applyGuard(res, check);
    if (applied) return applied;
  }

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'Servicio de email no configurado',
    });
  }

  const form = formData as NewClientFormData;

  await sendBrevoEmail({
    to: TEAM_RECIPIENTS,
    subject: `Nuevo Cliente Registrado: ${form.razonSocial}`,
    htmlContent: buildTeamNotificationHtml(form),
    textContent: buildTeamNotificationText(form),
    senderName: 'SeemannPage New Form',
  });

  try {
    await sendBrevoEmail({
      to: [
        {
          email: form.emailContabilidad,
          name: form.nombreResponsableContabilidad,
        },
      ],
      subject: 'Confirmación de Registro - Nuevos Clientes Seemann Group',
      htmlContent: buildClientConfirmationHtml(form),
      senderName: 'Seemann Group',
    });
  } catch (error) {
    console.error('[send-new-client] Confirmación al cliente falló:', error);
  }

  return res.status(200).json({
    success: true,
    message: 'Formulario de nuevo cliente enviado exitosamente',
  });
});
