import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendBrevoEmail } from '../_lib/brevo/index';
import { createHandler } from '../_lib/create-handler';
import { TEAM_RECIPIENTS } from '../_lib/recipients';
import {
  buildClientConfirmationHtml,
  buildTeamNotificationHtml,
  buildTeamNotificationText,
} from './templates';
import { REQUIRED_FIELDS, type NewClientFormData } from './types';

export default createHandler(async (req: VercelRequest, res: VercelResponse) => {
  const formData = req.body as Partial<NewClientFormData>;

  const missingFields = REQUIRED_FIELDS.filter((field) => !formData[field]?.toString().trim());

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos requeridos',
      missingFields,
    });
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
