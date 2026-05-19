import type { NewClientFormData } from './types';

const formatDate = () =>
  new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const na = (value?: string) => value?.trim() || 'N/A';

export function buildClientConfirmationHtml(form: NewClientFormData): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">SEEMANN GROUP</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Confirmación de Registro</p>
      </div>
      <div style="background: white; padding: 30px 20px;">
        <p>Estimado/a <strong>${form.nombreSolicitante}</strong>,</p>
        <p>Gracias por completar el formulario de <strong>Nuevos Clientes</strong>. Hemos recibido su información.</p>
        <table style="width: 100%; font-size: 14px; margin: 20px 0;">
          <tr><td><strong>Empresa:</strong></td><td>${form.razonSocial}</td></tr>
          <tr><td><strong>RUT:</strong></td><td>${form.rut}</td></tr>
        </table>
        <p>Nuestro equipo se pondrá en contacto con usted a la brevedad.</p>
      </div>
    </div>
  `;
}

export function buildTeamNotificationHtml(form: NewClientFormData): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 30px 20px;">
        <h1 style="margin: 0; font-size: 26px;">Nuevo Cliente Registrado</h1>
        <p style="margin: 10px 0 0 0;">Formulario Web - Nuevos Clientes</p>
      </div>
      <div style="padding: 25px 20px; background: white;">
        <h2 style="color: #bd2121;">Datos Principales</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px; border: 1px solid #dee2e6;"><strong>RUT</strong></td><td style="padding: 8px; border: 1px solid #dee2e6;">${form.rut}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Razón Social</strong></td><td style="padding: 8px; border: 1px solid #dee2e6;">${form.razonSocial}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Representante Legal</strong></td><td style="padding: 8px; border: 1px solid #dee2e6;">${form.representanteLegal}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Giro</strong></td><td style="padding: 8px; border: 1px solid #dee2e6;">${form.giro}</td></tr>
        </table>
        <h2 style="color: #bd2121; margin-top: 24px;">Dirección Comercial</h2>
        <p>${form.direccionComercial}<br>${form.comunaComercial}, ${form.ciudadComercial}</p>
        <h2 style="color: #bd2121; margin-top: 24px;">Contabilidad</h2>
        <p>${form.nombreResponsableContabilidad} — ${form.emailContabilidad}</p>
        <h2 style="color: #bd2121; margin-top: 24px;">Solicitante</h2>
        <p>${form.nombreSolicitante} — ${form.celularSolicitante}</p>
        <p style="margin-top: 20px; font-size: 13px; color: #6c757d;"><strong>Fecha:</strong> ${formatDate()}</p>
      </div>
    </div>
  `;
}

export function buildTeamNotificationText(form: NewClientFormData): string {
  return [
    'NUEVO CLIENTE - Seemann Group',
    '',
    `Razón Social: ${form.razonSocial}`,
    `RUT: ${form.rut}`,
    `Representante: ${form.representanteLegal}`,
    `Dirección: ${form.direccionComercial}, ${form.comunaComercial}, ${form.ciudadComercial}`,
    `Contabilidad: ${form.nombreResponsableContabilidad} <${form.emailContabilidad}>`,
    `Solicitante: ${form.nombreSolicitante} — ${form.celularSolicitante}`,
    `Entrega carga: ${na(form.direccionEntregaCarga)}`,
    `Fecha: ${formatDate()}`,
  ].join('\n');
}
