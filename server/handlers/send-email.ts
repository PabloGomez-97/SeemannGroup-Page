import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendBrevoEmail } from '../lib/brevo/index';
import { createHandler } from '../lib/create-handler';
import { TEAM_RECIPIENTS } from '../lib/recipients';
import {
  buildClientConfirmationHtml,
  buildTeamNotificationHtml,
  buildTeamNotificationText,
  type ContactPayload,
} from '../templates/contact';

export default createHandler(async (req: VercelRequest, res: VercelResponse) => {
  const body = req.body as Partial<ContactPayload>;
  const { nombre, telefono, correo, cargo } = body;

  if (!nombre?.trim() || !telefono?.trim()) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
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
    htmlContent: buildTeamNotificationHtml(payload),
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
