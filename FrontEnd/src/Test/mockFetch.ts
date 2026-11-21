import { vi } from "vitest";

interface RespuestaSimulada {
  status?: number;
  datos: unknown;
}

// Reemplaza global fetch por una función que responde según la URL consultada.
// Si varias claves coinciden se usa la más larga (la más específica).
export function simularFetch(respuestas: Record<string, RespuestaSimulada>) {
  const fetchSimulado = vi.fn(async (url: string | URL | Request) => {
    const direccion = String(url);
    const clave = Object.keys(respuestas)
      .filter((inicio) => direccion.startsWith(inicio))
      .sort((a, b) => b.length - a.length)[0];

    const respuesta = clave ? respuestas[clave] : { status: 404, datos: { mensaje: "No encontrado" } };
    const status = respuesta.status ?? 200;

    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => respuesta.datos
    } as Response;
  });

  globalThis.fetch = fetchSimulado as unknown as typeof fetch;
  return fetchSimulado;
}
