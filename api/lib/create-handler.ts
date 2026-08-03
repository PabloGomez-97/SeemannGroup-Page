import type { VercelRequest, VercelResponse } from '@vercel/node';
import { BrevoError } from './brevo/index.js';

type ApiHandler = (
  req: VercelRequest,
  res: VercelResponse,
) => Promise<VercelResponse | void>;

const DEFAULT_ORIGINS = [
  'https://seemanngroup.com',
  'https://www.seemanngroup.com',
  'https://pageseemanngroup.vercel.app',
  'https://pageseemanngroup-seemanngroup.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ORIGINS;
}

function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
  if (allowedOrigins.includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    if (hostname === 'seemanngroup.com' || hostname.endsWith('.seemanngroup.com')) {
      return true;
    }
    if (
      hostname === 'pageseemanngroup.vercel.app' ||
      hostname.endsWith('-seemanngroup.vercel.app')
    ) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function createHandler(handler: ApiHandler) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const originHeader = req.headers.origin;
    const origin = typeof originHeader === 'string' ? originHeader : undefined;
    const allowedOrigins = getAllowedOrigins();
    const originOk = origin ? isOriginAllowed(origin, allowedOrigins) : true;
    const allowOrigin = origin && originOk ? origin : allowedOrigins[0];

    res.setHeader('Access-Control-Allow-Origin', allowOrigin ?? '');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (origin && !originOk) {
      return res.status(403).json({ error: 'Origen no permitido' });
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
