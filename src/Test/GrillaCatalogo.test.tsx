// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GrillaCatalogo from "../organism/GrillaCatalogo";

const productos = [
  { id: "SV001", nombre: "Consulta general", categoria: "Consultas", precio: "$15.000", imagen: "/img/1.jpg" },
  { id: "CI001", nombre: "Esterilización canina", categoria: "Cirugía", precio: "$80.000", imagen: "/img/2.jpg" }
];

test("el buscador filtra y muestra el producto Esterilización canina", () => {
  render(
    <MemoryRouter>
      <GrillaCatalogo items={productos} />
    </MemoryRouter>
  );

  const buscador = screen.getByPlaceholderText("Buscar...");
  fireEvent.change(buscador, { target: { value: "Esterilización" } });

  const producto = screen.getByText("Esterilización canina");
  expect(producto.textContent).toBe("Esterilización canina");
});