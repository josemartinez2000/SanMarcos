// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GrillaCatalogo from "../organism/GrillaCatalogo";

const listaProductos = [
  { id: "SV001", nombre: "Consulta general", categoria: "Consultas", precio: "$15.000", imagen: "/img/1.jpg" },
  { id: "CI001", nombre: "Esterilización canina", categoria: "Cirugía", precio: "$80.000", imagen: "/img/2.jpg" }
];

test("filtra los productos del catálogo al escribir en el buscador", () => {
  render(
    <MemoryRouter>
      <GrillaCatalogo items={listaProductos} />
    </MemoryRouter>
  );

  const buscador = screen.getByPlaceholderText("Buscar...");
  fireEvent.change(buscador, { target: { value: "Esterilización" } });

  expect(screen.queryByText("Consulta general")).toBeNull();
  const resultado = screen.getByText("Esterilización canina");
  expect(resultado.textContent).toBe("Esterilización canina");
});