// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardMedicamento from "../molecules/CardMedicamento";

test("la tarjeta muestra el nombre del producto y lo guarda en localStorage al ver detalle", () => {
  localStorage.clear();

  render(
    <MemoryRouter>
      <CardMedicamento
        id="ME004"
        nombre="Nexgard"
        categoria="Antiparasitarios"
        precio="$9.500"
        imagen="/img/Nexgard.jpg"
      />
    </MemoryRouter>
  );

  const titulo = screen.getByText("Nexgard");
  expect(titulo.textContent).toBe("Nexgard");

  fireEvent.click(screen.getByRole("button", { name: "Ver detalle" }));

  const guardado = localStorage.getItem("productoSeleccionado");
  expect(guardado).toContain("Nexgard");
});