import type { EmailRecipient } from '../recipients.js';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const DEFAULT_SENDER_EMAIL = 'noreply@sphereglobal.io';
const DEFAULT_SENDER_NAME = 'SeemannPage New Form';

export class BrevoError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly responseBody: string,
  ) {
    super(message);
    this.name = 'BrevoError';
  }
}

export interface SendBrevoEmailOptions {
  to: EmailRecipient[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  senderName?: string;
  senderEmail?: string;
}

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  textContent,
  senderName = DEFAULT_SENDER_NAME,
  senderEmail = DEFAULT_SENDER_EMAIL,
}: SendBrevoEmailOptions): Promise<{ messageId: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY no está configurada');
  }

  const brevoResponse = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to,
      subject,
      htmlContent,
      ...(textContent ? { textContent } : {}),
    }),
  });

  const responseText = await brevoResponse.text();

  if (!brevoResponse.ok) {
    console.error('[Brevo] Error', brevoResponse.status, responseText);
    throw new BrevoError(
      `Brevo rechazó el envío (${brevoResponse.status})`,
      brevoResponse.status,
      responseText,
    );
  }

  try {
    const parsed = JSON.parse(responseText) as { messageId?: string };
    return { messageId: parsed.messageId ?? 'unknown' };
  } catch {
    return { messageId: 'unknown' };
  }
}
