// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardMedicamento from "../molecules/CardMedicamento";

test("la tarjeta muestra el nombre del producto Nexgard", () => {
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
});

test("la tarjeta guarda el producto en localStorage al hacer clic en Ver detalle", () => {
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

  const botones = screen.getAllByRole("button", { name: "Ver detalle" });
  fireEvent.click(botones[0]);

  expect(localStorage.getItem("productoSeleccionado")).toContain("Nexgard");
});