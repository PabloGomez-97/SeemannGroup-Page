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
  buildTeamNotificationText,
  type ContactPayload,
} from '../templates/contact.js';

function applyGuard(
  res: VercelResponse,
  result: SpamGuardResult,
): VercelResponse | null {
  if (result.ok) return null;
  if (result.silent) {
    return res.status(200).json({
      success: true,
      message: 'Registro completado exitosamente',
    });
  }
  return res.status(result.status).json({ error: result.error });
}

export default createHandler(async (req: VercelRequest, res: VercelResponse) => {
  const body = req.body as Partial<ContactPayload> & {
    turnstileToken?: string;
    website?: string;
    formLoadedAt?: number | string;
  };

  const honeypot = applyGuard(res, checkHoneypot(body.website));
  if (honeypot) return honeypot;

  const timing = applyGuard(res, checkFormTiming(body.formLoadedAt));
  if (timing) return timing;

  const ip = getClientIp(req);
  if (isRateLimited(`send-email:${ip ?? 'unknown'}`)) {
    return res.status(429).json({ error: 'Demasiados intentos. Intenta más tarde.' });
  }

  const token = body.turnstileToken?.trim();
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

  const { nombre, telefono, correo, cargo } = body;

  if (!nombre?.trim() || !telefono?.trim()) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const gibberish = applyGuard(
    res,
    rejectIfGibberish([nombre, cargo, correo]),
  );
  if (gibberish) return gibberish;

  const phoneCheck = applyGuard(res, rejectIfBadPhone(telefono));
  if (phoneCheck) return phoneCheck;

  if (correo?.trim()) {
    const emailCheck = applyGuard(res, rejectIfBadEmail(correo));
    if (emailCheck) return emailCheck;
  }

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'Servicio de email no configurado',
    });
  }

  const payload: ContactPayload = {
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    correo: correo?.trim() || undefined,
    cargo: cargo?.trim() || undefined,
  };

  await sendBrevoEmail({
    to: TEAM_RECIPIENTS,
    subject: `Nuevo contacto: ${payload.nombre}`,
    htmlContent: buildClientConfirmationHtml(payload),
    textContent: buildTeamNotificationText(payload),
  });

  if (payload.correo) {
    try {
      await sendBrevoEmail({
        to: [{ email: payload.correo, name: payload.nombre }],
        subject: 'Confirmación de Contacto - Seemann Group',
        htmlContent: buildClientConfirmationHtml(payload),
        senderName: 'Seemann Group',
      });
    } catch (error) {
      console.error('[send-email] Confirmación al cliente falló:', error);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Registro completado exitosamente',
  });
});
