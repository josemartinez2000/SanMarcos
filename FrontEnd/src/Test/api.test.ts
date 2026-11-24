// @vitest-environment jsdom
import { test, expect } from "vitest";
import { encabezados, obtenerMensajeError } from "../services/api";

test("encabezados agrega el token Bearer solo cuando hay sesión", () => {
  localStorage.clear();
  expect(encabezados(true)).toEqual({ "Content-Type": "application/json" });

  localStorage.setItem("token", "abc123");
  expect(encabezados()).toEqual({ Authorization: "Bearer abc123" });
});

test("un 401 con sesión guardada cierra la sesión y avisa que expiró", async () => {
  localStorage.clear();
  localStorage.setItem("token", "vencido");
  localStorage.setItem("usuarioLogueado", "cliente@gmail.com");
  localStorage.setItem("rolUsuario", "CLIENTE");

  const mensaje = await obtenerMensajeError({ status: 401 } as Response, "Error");

  expect(mensaje).toBe("Su sesión expiró. Inicie sesión nuevamente.");
  expect(localStorage.getItem("token")).toBeNull();
  expect(localStorage.getItem("usuarioLogueado")).toBeNull();
});

test("usa el mensaje que envía el backend", async () => {
  localStorage.clear();
  const respuesta = { status: 409, json: async () => ({ mensaje: "El correo ya se encuentra registrado" }) } as Response;

  expect(await obtenerMensajeError(respuesta, "Error")).toBe("El correo ya se encuentra registrado");
});
