import type { NewClientFormData } from './new-client-types.js';

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

const labelCell =
  'padding: 8px; border: 1px solid #ddd; background: #f9f9f9; width: 38%;';
const valueCell = 'padding: 8px; border: 1px solid #ddd;';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tableRow(label: string, value: string): string {
  const safe = escapeHtml(value);
  return `<tr><td style="${labelCell}"><strong>${label}:</strong></td><td style="${valueCell}">${safe}</td></tr>`;
}

function sectionTable(title: string, rows: string): string {
  return `
    <h3 style="color: #bd2121; font-size: 16px; margin: 24px 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #bd2121;">${title}</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 14px;">
      ${rows}
    </table>
  `;
}

function emailWrapper(subtitle: string, body: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="border-bottom: 3px solid #bd2121; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #bd2121;">SEEMANN GROUP</h2>
        <p style="margin: 5px 0 0 0; color: #666;">${subtitle}</p>
      </div>
      ${body}
    </div>
  `;
}

/** Confirmación al email de contabilidad (mismo estilo que formulario de contacto). */
export function buildClientConfirmationHtml(form: NewClientFormData): string {
  const rows = [
    tableRow('Empresa', form.razonSocial),
    tableRow('RUT', form.rut),
    tableRow('Representante Legal', form.representanteLegal),
    tableRow('Email Contabilidad', form.emailContabilidad),
  ].join('');

  const body = `
    <p>Estimado/a <strong>${escapeHtml(form.nombreSolicitante)}</strong>,</p>
    <p>Gracias por completar el formulario de <strong>Nuevos Clientes</strong>. Hemos recibido su información:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      ${rows}
    </table>
    <p>Nuestro equipo de <strong>Finanzas</strong> revisará su información y se pondrá en contacto con usted a la brevedad.</p>
    <p>Saludos cordiales,<br><strong>Equipo Seemann Group</strong></p>
  `;

  return emailWrapper('Confirmación de Registro - Nuevos Clientes', body);
}

/** Notificación completa al equipo (mismo estilo HTML que contact.ts). */
export function buildTeamNotificationHtml(form: NewClientFormData): string {
  const principales = [
    tableRow('RUT', form.rut),
    tableRow('Razón Social', form.razonSocial),
    tableRow('Nombre Fantasía', na(form.nombreFantasia)),
    tableRow('Representante Legal', form.representanteLegal),
    tableRow('RUT Representante', form.rutRepresentante),
    tableRow('Giro', form.giro),
    tableRow('Forma de Pago', na(form.formaPago)),
    tableRow('Plazo', na(form.plazo)),
  ].join('');

  const direcciones = [
    tableRow(
      'Dirección Comercial',
      `${form.direccionComercial}, ${form.comunaComercial}, ${form.ciudadComercial}`,
    ),
    tableRow(
      'Entrega de Carga',
      `${na(form.direccionEntregaCarga)}, ${na(form.comunaEntregaCarga)}, ${na(form.ciudadEntregaCarga)}`,
    ),
    tableRow(
      'Entrega de Documentos',
      `${na(form.direccionEntregaDoctos)}, ${na(form.comunaEntregaDoctos)}, ${na(form.ciudadEntregaDoctos)}`,
    ),
  ].join('');

  const contabilidad = [
    tableRow('Nombre', form.nombreResponsableContabilidad),
    tableRow('Cargo', form.cargoContabilidad),
    tableRow('Email', form.emailContabilidad),
    tableRow('Celular', na(form.celularContabilidad)),
    tableRow('Teléfono', form.fonoContabilidad),
    tableRow('Fax', form.faxContabilidad),
  ].join('');

  const comexGerente = [
    tableRow('Comex Exportaciones', `${form.comexExportaciones} — ${form.cargoComex}`),
    tableRow('Gerente Comercial', form.gerenteComercial),
    tableRow('Email Gerente', form.emailGerente),
    tableRow('Teléfono Gerente', form.fonoGerente),
    tableRow('Fax Gerente', form.faxGerente),
  ].join('');

  const solicitante = [
    tableRow('Nombre Solicitante', form.nombreSolicitante),
    tableRow('Fecha Solicitud', na(form.fechaSolicitud)),
    tableRow('Celular Solicitante', form.celularSolicitante),
    tableRow('Fecha de Registro', formatDate()),
  ].join('');

  const body = `
    <p><strong>Nuevo registro de cliente</strong> desde el formulario web:</p>
    ${sectionTable('Datos Principales', principales)}
    ${sectionTable('Direcciones', direcciones)}
    ${sectionTable('Contabilidad', contabilidad)}
    ${sectionTable('Comex y Gerente Comercial', comexGerente)}
    ${sectionTable('Datos del Solicitante', solicitante)}
    <p style="margin: 0; color: #666; font-size: 13px;">Mensaje automático — Formulario Nuevos Clientes</p>
  `;

  return emailWrapper('Nuevo Cliente Registrado', body);
}

export function buildTeamNotificationText(form: NewClientFormData): string {
  return [
    'NUEVO CLIENTE - Seemann Group',
    '',
    '--- DATOS PRINCIPALES ---',
    `RUT: ${form.rut}`,
    `Razón Social: ${form.razonSocial}`,
    `Nombre Fantasía: ${na(form.nombreFantasia)}`,
    `Representante Legal: ${form.representanteLegal}`,
    `RUT Representante: ${form.rutRepresentante}`,
    `Giro: ${form.giro}`,
    `Forma de Pago: ${na(form.formaPago)}`,
    `Plazo: ${na(form.plazo)}`,
    '',
    '--- DIRECCIONES ---',
    `Comercial: ${form.direccionComercial}, ${form.comunaComercial}, ${form.ciudadComercial}`,
    `Entrega Carga: ${na(form.direccionEntregaCarga)}, ${na(form.comunaEntregaCarga)}, ${na(form.ciudadEntregaCarga)}`,
    `Entrega Documentos: ${na(form.direccionEntregaDoctos)}, ${na(form.comunaEntregaDoctos)}, ${na(form.ciudadEntregaDoctos)}`,
    '',
    '--- CONTABILIDAD ---',
    `Nombre: ${form.nombreResponsableContabilidad}`,
    `Cargo: ${form.cargoContabilidad}`,
    `Email: ${form.emailContabilidad}`,
    `Celular: ${na(form.celularContabilidad)}`,
    `Teléfono: ${form.fonoContabilidad}`,
    `Fax: ${form.faxContabilidad}`,
    '',
    '--- COMEX / GERENTE ---',
    `Comex: ${form.comexExportaciones} (${form.cargoComex})`,
    `Gerente: ${form.gerenteComercial}`,
    `Email: ${form.emailGerente}`,
    `Teléfono: ${form.fonoGerente}`,
    `Fax: ${form.faxGerente}`,
    '',
    '--- SOLICITANTE ---',
    `Nombre: ${form.nombreSolicitante}`,
    `Fecha solicitud: ${na(form.fechaSolicitud)}`,
    `Celular: ${form.celularSolicitante}`,
    '',
    `Fecha registro: ${formatDate()}`,
  ].join('\n');
}
