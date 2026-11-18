// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CampoFormulario from "../molecules/CampoFormulario";

test("el campo formulario muestra el texto del label", () => {
  // Aquí se renderiza la molécula CampoFormulario con el título Correo Electrónico:
  render(
    <CampoFormulario
      label="Correo Electrónico:"
      tipo="email"
      valor=""
      onChange={() => {}}
    />
  );

  // Aquí se busca la etiqueta en pantalla por su texto
  const label = screen.getByText("Correo Electrónico:");

  // Aquí se comprueba que el texto de la etiqueta sea Correo Electrónico:
  expect(label.textContent).toBe("Correo Electrónico:");
});

test("el campo formulario muestra el valor escrito en el input", () => {
  // Aquí se renderiza el campo con el valor admin@sanmarcos.cl
  render(
    <CampoFormulario
      label="Correo:"
      tipo="email"
      valor="admin@sanmarcos.cl"
      onChange={() => {}}
    />
  );

  // Aquí se busca el input por el valor que tiene adentro y se comprueba que coincida
  const input = screen.getByDisplayValue("admin@sanmarcos.cl") as HTMLInputElement;
  expect(input.value).toBe("admin@sanmarcos.cl");
});