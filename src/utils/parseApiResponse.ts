export async function parseApiResponse(
  response: Response,
): Promise<Record<string, unknown>> {
  const text = await response.text();

  if (!text) {
    if (response.status === 404) {
      throw new Error(
        "No se encontró el servidor de formularios. Usa «npm run dev» (incluye la API local).",
      );
    }
    throw new Error(`Error del servidor (${response.status})`);
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Respuesta inválida del servidor");
  }
}
