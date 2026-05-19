export interface ContactPayload {
  nombre: string;
  telefono: string;
  correo?: string;
  cargo?: string;
}

const formatDate = () =>
  new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export function buildClientConfirmationHtml(data: ContactPayload): string {
  const { nombre, telefono, correo, cargo } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="border-bottom: 3px solid #bd2121; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #bd2121;">SEEMANN GROUP</h2>
        <p style="margin: 5px 0 0 0; color: #666;">Confirmación de Contacto</p>
      </div>
      <p>Estimado/a <strong>${nombre}</strong>,</p>
      <p>Gracias por contactarnos. Hemos recibido su información:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Nombre:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nombre}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Teléfono:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${telefono}</td></tr>
        ${correo ? `<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${correo}</td></tr>` : ''}
        ${cargo ? `<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Cargo:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cargo}</td></tr>` : ''}
      </table>
      <p>Nuestro equipo se pondrá en contacto con usted a la brevedad.</p>
      <p>Saludos cordiales,<br><strong>Equipo Seemann Group</strong></p>
    </div>
  `;
}

export function buildTeamNotificationHtml(data: ContactPayload): string {
  const { nombre, telefono, correo, cargo } = data;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Nuevo Contacto</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 14px;">Formulario Web - Seemann Group</p>
      </div>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Nombre</strong><br><span>${nombre}</span></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Teléfono</strong><br><a href="tel:${telefono}" style="color: #bd2121;">${telefono}</a></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Email</strong><br><span>${correo ?? 'No proporcionado'}</span></td></tr>
          <tr><td style="padding: 12px 0;"><strong>Cargo</strong><br><span>${cargo ?? 'No proporcionado'}</span></td></tr>
        </table>
      </div>
      <div style="background: #e9ecef; padding: 15px; border-radius: 8px; border-left: 4px solid #bd2121;">
        <p style="margin: 0; font-size: 13px; color: #6c757d;"><strong>Fecha:</strong> ${formatDate()}</p>
      </div>
    </div>
  `;
}

export function buildTeamNotificationText(data: ContactPayload): string {
  return [
    'NUEVO CONTACTO - Seemann Group',
    '',
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.correo ?? 'No proporcionado'}`,
    `Cargo: ${data.cargo ?? 'No proporcionado'}`,
    '',
    `Fecha: ${formatDate()}`,
  ].join('\n');
}
