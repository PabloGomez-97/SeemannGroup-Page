export interface NewClientFormData {
  rut: string;
  razonSocial: string;
  nombreFantasia?: string;
  representanteLegal: string;
  rutRepresentante: string;
  giro: string;
  formaPago?: string;
  plazo?: string;
  direccionComercial: string;
  comunaComercial: string;
  ciudadComercial: string;
  direccionEntregaCarga?: string;
  comunaEntregaCarga?: string;
  ciudadEntregaCarga?: string;
  direccionEntregaDoctos?: string;
  comunaEntregaDoctos?: string;
  ciudadEntregaDoctos?: string;
  nombreResponsableContabilidad: string;
  cargoContabilidad: string;
  emailContabilidad: string;
  celularContabilidad?: string;
  fonoContabilidad: string;
  faxContabilidad: string;
  comexExportaciones: string;
  cargoComex: string;
  gerenteComercial: string;
  emailGerente: string;
  fonoGerente: string;
  faxGerente: string;
  nombreSolicitante: string;
  fechaSolicitud?: string;
  celularSolicitante: string;
}

export const REQUIRED_FIELDS: (keyof NewClientFormData)[] = [
  'rut',
  'razonSocial',
  'representanteLegal',
  'rutRepresentante',
  'giro',
  'direccionComercial',
  'comunaComercial',
  'ciudadComercial',
  'nombreResponsableContabilidad',
  'cargoContabilidad',
  'emailContabilidad',
  'fonoContabilidad',
  'faxContabilidad',
  'comexExportaciones',
  'cargoComex',
  'gerenteComercial',
  'emailGerente',
  'fonoGerente',
  'faxGerente',
  'nombreSolicitante',
  'celularSolicitante',
];
