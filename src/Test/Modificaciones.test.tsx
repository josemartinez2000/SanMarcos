// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modificaciones from "../pages/Modificaciones";

test("la página de modificaciones muestra el título del inventario y el primer servicio", () => {
  // Aquí se renderiza la página Modificaciones dentro de MemoryRouter
  render(
    <MemoryRouter>
      <Modificaciones />
    </MemoryRouter>
  );

  // Aquí se busca el título principal de la vista de inventario
  const titulo = screen.getByText("Vista Catálogo (Inventario)");
  expect(titulo.textContent).toBe("Vista Catálogo (Inventario)");

  // Aquí se verifica que el servicio Consulta general se cargue en la pantalla
  const servicio = screen.getByText("Consulta general");
  expect(servicio.textContent).toBe("Consulta general");
});