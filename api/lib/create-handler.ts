import type { VercelRequest, VercelResponse } from '@vercel/node';
import { BrevoError } from './brevo/index.js';

type ApiHandler = (
  req: VercelRequest,
  res: VercelResponse,
) => Promise<VercelResponse | void>;

export function createHandler(handler: ApiHandler) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      return await handler(req, res);
    } catch (error) {
      console.error('[API]', error);

      if (error instanceof BrevoError) {
        return res.status(502).json({
          success: false,
          error: 'No se pudo enviar el correo',
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
}
