// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CampoFormulario from "../molecules/CampoFormulario";

test("el campo de formulario muestra la etiqueta label correctamente", () => {
  // Aquí se renderiza la molécula CampoFormulario con sus propiedades obligatorias
  render(
    <CampoFormulario
      label="Correo Electrónico:"
      tipo="email"
      valor="cliente@correo.cl"
      onChange={() => {}}
    />
  );

  // Aquí se obtiene la etiqueta por su texto visible en pantalla
  const etiqueta = screen.getByText("Correo Electrónico:");

  // Aquí se comprueba que el texto de la etiqueta sea igual a Correo Electrónico:
  expect(etiqueta.textContent).toBe("Correo Electrónico:");
});

test("el campo de formulario llama a la función onChange al modificar el input", () => {
  // Aquí se define un espía para comprobar la escritura en el campo
  const manejarCambio = vi.fn();

  render(
    <CampoFormulario
      label="Nombre:"
      tipo="text"
      valor=""
      onChange={manejarCambio}
    />
  );

  // Aquí se simula el cambio de valor dentro de la caja de texto
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Amoxibay" } });

  // Aquí se verifica que se haya ejecutado la función al escribir
  expect(manejarCambio).toHaveBeenCalledTimes(1);
});