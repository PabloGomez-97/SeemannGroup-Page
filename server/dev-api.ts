import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { config } from 'dotenv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import sendEmail from './handlers/send-email';
import sendNewClient from './handlers/send-new-client';

config();

const PORT = Number(process.env.API_PORT) || 3001;

type ApiHandler = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

const routes: Record<string, ApiHandler> = {
  'POST /api/send-email': sendEmail,
  'POST /api/send-new-client': sendNewClient,
};

function patchResponse(res: ServerResponse): VercelResponse {
  const vercelRes = res as unknown as VercelResponse;

  vercelRes.status = ((code: number) => {
    res.statusCode = code;
    return {
      json: (body: unknown) => {
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'application/json');
        }
        res.end(JSON.stringify(body));
      },
      end: (data?: string) => {
        res.end(data);
      },
    } as unknown as VercelResponse;
  }) as VercelResponse['status'];

  return vercelRes;
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  const pathname = req.url?.split('?')[0] ?? '';
  const routeKey = `${req.method} ${pathname}`;
  const handler = routes[routeKey];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (!handler) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    return;
  }

  const vercelReq = req as unknown as VercelRequest;
  const vercelRes = patchResponse(res);

  try {
    vercelReq.body = await readBody(req);
    await handler(vercelReq, vercelRes);
  } catch (error) {
    console.error(`[dev-api] ${routeKey}:`, error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: false,
          error: 'Error interno del servidor',
          message: error instanceof Error ? error.message : 'Error desconocido',
        }),
      );
    }
  }
});

server.listen(PORT, () => {
  console.log(`[dev-api] API local en http://localhost:${PORT}`);
});
