// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioRegistro from "../organism/FormularioRegistro";

test("no envía el registro cuando las contraseñas no coinciden", () => {
  const fetchEspia = vi.fn();
  globalThis.fetch = fetchEspia as unknown as typeof fetch;

  const { container, getByText } = render(
    <MemoryRouter>
      <FormularioRegistro />
    </MemoryRouter>
  );

  // Orden de los campos: nombre, correo, teléfono, contraseña y confirmación
  const campos = container.querySelectorAll("input");
  fireEvent.change(campos[0], { target: { value: "Pedro González" } });
  fireEvent.change(campos[1], { target: { value: "pedro@gmail.com" } });
  fireEvent.change(campos[3], { target: { value: "clave123" } });
  fireEvent.change(campos[4], { target: { value: "otraClave" } });
  fireEvent.click(getByText("Registrar"));

  expect(getByText("Las contraseñas no coinciden.")).toBeTruthy();
  expect(fetchEspia).not.toHaveBeenCalled();
});
