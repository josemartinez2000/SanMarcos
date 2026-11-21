// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioLogin from "../organism/FormularioLogin";
import { simularFetch } from "./mockFetch";

test("el formulario de login muestra el título Iniciar Sesión", () => {
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  const titulo = screen.getByText("Iniciar Sesión");

  expect(titulo.textContent).toBe("Iniciar Sesión");
});

test("muestra un mensaje de error cuando se presiona Ingresar con los campos vacíos", () => {
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  const botones = screen.getAllByRole("button", { name: "Ingresar" });
  fireEvent.click(botones[0]);

  const error = screen.getByText("Todos los campos son obligatorios.");
  expect(error.textContent).toBe("Todos los campos son obligatorios.");
});

test("guarda el usuario y su rol en localStorage cuando el login es correcto", async () => {
  localStorage.clear();

  // Aquí se simula la respuesta de clientes-service para un administrador
  const fetchSimulado = simularFetch({
    "http://localhost:8081/api/clientes/login": {
      datos: { id: 1, nombreCompleto: "Administrador San Marcos", correo: "admin@sanmarcos.cl", telefono: "", rol: "ADMIN", fechaRegistro: "2026-03-01T09:00:00" }
    }
  });

  const { container } = render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  // Aquí se completan los campos dentro del formulario recién renderizado
  const correo = container.querySelector('input[type="email"]') as HTMLInputElement;
  const clave = container.querySelector('input[type="password"]') as HTMLInputElement;
  fireEvent.change(correo, { target: { value: "admin@sanmarcos.cl" } });
  fireEvent.change(clave, { target: { value: "admin123" } });
  fireEvent.click(container.querySelector("button") as HTMLButtonElement);

  await waitFor(() => expect(localStorage.getItem("rolUsuario")).toBe("ADMIN"));
  expect(localStorage.getItem("usuarioLogueado")).toBe("admin@sanmarcos.cl");
  expect(fetchSimulado).toHaveBeenCalledWith(
    "http://localhost:8081/api/clientes/login",
    expect.objectContaining({ method: "POST" })
  );
});

test("muestra el mensaje del backend cuando las credenciales son incorrectas", async () => {
  localStorage.clear();
  simularFetch({
    "http://localhost:8081/api/clientes/login": { status: 401, datos: { mensaje: "Correo o contraseña incorrectos" } }
  });

  const { container, findByText } = render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  fireEvent.change(container.querySelector('input[type="email"]') as HTMLInputElement, { target: { value: "cliente@gmail.com" } });
  fireEvent.change(container.querySelector('input[type="password"]') as HTMLInputElement, { target: { value: "malaclave" } });
  fireEvent.click(container.querySelector("button") as HTMLButtonElement);

  const error = await findByText("Correo o contraseña incorrectos");
  expect(error).toBeTruthy();
  expect(localStorage.getItem("usuarioLogueado")).toBeNull();
});
