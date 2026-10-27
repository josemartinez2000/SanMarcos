// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioLogin from "../organism/FormularioLogin";

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

  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  const error = screen.getByText("Todos los campos son obligatorios.");
  expect(error.textContent).toBe("Todos los campos son obligatorios.");
});