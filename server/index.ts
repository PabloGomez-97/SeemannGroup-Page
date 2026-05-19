/**
 * Lógica compartida de formularios (Brevo).
 * - Desarrollo: `server/dev-api.ts`
 * - Producción (Vercel): `api/send-email.ts` y `api/send-new-client.ts`
 */
export { default as sendEmailHandler } from './handlers/send-email';
export { default as sendNewClientHandler } from './handlers/send-new-client';
export { sendBrevoEmail, BrevoError } from './lib/brevo/index';
export { TEAM_RECIPIENTS } from './lib/recipients';
