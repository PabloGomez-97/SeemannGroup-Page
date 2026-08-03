const MIN_FORM_MS = 3000;
const GENERIC_REJECT = 'No se pudo procesar la solicitud';

export type SpamGuardResult =
  | { ok: true }
  | { ok: false; silent?: boolean; status: number; error: string };

function caseTransitions(value: string): number {
  let transitions = 0;
  for (let i = 1; i < value.length; i++) {
    const prev = value[i - 1]!;
    const curr = value[i]!;
    const prevUpper = prev === prev.toUpperCase() && prev !== prev.toLowerCase();
    const currUpper = curr === curr.toUpperCase() && curr !== curr.toLowerCase();
    const prevLower = prev === prev.toLowerCase() && prev !== prev.toUpperCase();
    const currLower = curr === curr.toLowerCase() && curr !== curr.toUpperCase();
    if ((prevUpper && currLower) || (prevLower && currUpper)) {
      transitions += 1;
    }
  }
  return transitions;
}

/** Detecta strings aleatorios tipo zyKcJbaEMgXJlQkjMJtSflp */
export function looksLikeGibberish(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  const tokens = trimmed.split(/[\s,.\-/]+/).filter(Boolean);
  const randomTokens = tokens.filter((token) => {
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{10,}$/u.test(token)) return false;
    const hasLower = /[a-záéíóúüñ]/.test(token);
    const hasUpper = /[A-ZÁÉÍÓÚÜÑ]/.test(token);
    if (!(hasLower && hasUpper)) return false;
    return caseTransitions(token) >= 4;
  });

  if (randomTokens.length >= 1 && tokens.length === 1) return true;
  if (randomTokens.length >= 2) return true;

  // Una sola “palabra” larga sin espacios, solo letras, con mezcla rara de mayúsculas
  if (
    /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{12,}$/u.test(trimmed) &&
    /[a-záéíóúüñ]/.test(trimmed) &&
    /[A-ZÁÉÍÓÚÜÑ]/.test(trimmed) &&
    caseTransitions(trimmed) >= 4
  ) {
    return true;
  }

  return false;
}

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Emails tipo i.ha.miz.a.p8.2.7@gmail.com */
export function isSuspiciousEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const local = email.trim().split('@')[0] ?? '';
  const parts = local.split('.');
  if (parts.length < 4) return false;
  const shortParts = parts.filter((part) => part.length <= 2).length;
  return shortParts >= 3;
}

export function isValidPhone(phone: string | undefined | null): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function checkHoneypot(website: unknown): SpamGuardResult {
  if (typeof website === 'string' && website.trim().length > 0) {
    return { ok: false, silent: true, status: 200, error: '' };
  }
  return { ok: true };
}

export function checkFormTiming(formLoadedAt: unknown): SpamGuardResult {
  const loaded =
    typeof formLoadedAt === 'number'
      ? formLoadedAt
      : typeof formLoadedAt === 'string'
        ? Number(formLoadedAt)
        : NaN;

  if (!Number.isFinite(loaded)) {
    return { ok: false, status: 400, error: GENERIC_REJECT };
  }

  const elapsed = Date.now() - loaded;
  if (elapsed < MIN_FORM_MS || elapsed > 1000 * 60 * 60 * 24) {
    return { ok: false, status: 400, error: GENERIC_REJECT };
  }

  return { ok: true };
}

export function rejectIfGibberish(
  fields: Array<string | undefined | null>,
): SpamGuardResult {
  if (fields.some((field) => looksLikeGibberish(field))) {
    return { ok: false, status: 400, error: GENERIC_REJECT };
  }
  return { ok: true };
}

export function rejectIfBadEmail(email: string | undefined | null): SpamGuardResult {
  if (!email) return { ok: true };
  if (!isValidEmailFormat(email) || isSuspiciousEmail(email)) {
    return { ok: false, status: 400, error: GENERIC_REJECT };
  }
  return { ok: true };
}

export function rejectIfBadPhone(phone: string | undefined | null): SpamGuardResult {
  if (!isValidPhone(phone)) {
    return { ok: false, status: 400, error: GENERIC_REJECT };
  }
  return { ok: true };
}

export { GENERIC_REJECT };
