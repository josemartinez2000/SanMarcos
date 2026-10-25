// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioLogin from "../organism/FormularioLogin";

test("muestra mensaje de error cuando los campos de login están vacíos", () => {
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  const mensajeError = screen.getByText("Todos los campos son obligatorios.");
  expect(mensajeError.textContent).toBe("Todos los campos son obligatorios.");
});

test("muestra mensaje de error cuando el formato del correo es inválido", () => {
  const { container } = render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  const inputs = container.querySelectorAll("input");
  fireEvent.change(inputs[0], { target: { value: "correosinroba" } });
  fireEvent.change(inputs[1], { target: { value: "123456" } });

  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  const mensajeError = screen.getByText("Por favor, ingrese un correo electrónico válido.");
  expect(mensajeError.textContent).toBe("Por favor, ingrese un correo electrónico válido.");
});

test("guarda la sesión como admin en localStorage al ingresar correo institucional", () => {
  localStorage.clear();

  const { container } = render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

  const inputs = container.querySelectorAll("input");
  fireEvent.change(inputs[0], { target: { value: "admin@sanmarcos.cl" } });
  fireEvent.change(inputs[1], { target: { value: "123456" } });

  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  expect(localStorage.getItem("usuarioLogueado")).toBe("admin@sanmarcos.cl");
  expect(localStorage.getItem("rolUsuario")).toBe("admin");
});