// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AgregarProducto from "../pages/AgregarProducto";

test("muestra una alerta cuando se intenta guardar un producto con los campos vacíos", () => {
  const alerta = vi
    .spyOn(window, "alert")
    .mockImplementation(() => {});

  // Aquí se espía fetch para comprobar que no se envía nada al backend
  const fetchEspia = vi.fn();
  globalThis.fetch = fetchEspia as unknown as typeof fetch;

  render(
    <MemoryRouter>
      <AgregarProducto />
    </MemoryRouter>
  );

  fireEvent.click(
    screen.getByRole("button", { name: "Guardar Producto" })
  );

  expect(alerta).toHaveBeenCalledWith("Por favor, complete al menos el Código, Nombre y Precio.");
  expect(fetchEspia).not.toHaveBeenCalled();

  alerta.mockRestore();
});
