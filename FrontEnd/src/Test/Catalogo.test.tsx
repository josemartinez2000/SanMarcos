// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalogo from "../pages/Catalogo";
import { simularFetch } from "./mockFetch";

test("el catálogo carga los servicios desde servicios-service y muestra el precio formateado", async () => {
  simularFetch({
    "http://localhost:8083/api/servicios": {
      datos: [
        { id: 1, codigo: "SV001", nombre: "Consulta general", categoria: "Consultas", precio: 15000, duracion: "30 min", imagen: "/img/Consulta general.jpg", detalles: "Evaluación clínica" },
        { id: 6, codigo: "SV006", nombre: "Esterilización hembra canina", categoria: "Cirugía", precio: 80000, duracion: "90 min", imagen: "/img/Esterilización hembra canina.jpg", detalles: "" }
      ]
    }
  });

  render(
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>
  );

  // Aquí se espera a que la respuesta simulada se muestre en la grilla
  const servicio = await screen.findByText("Consulta general");
  expect(servicio.textContent).toBe("Consulta general");
  expect(screen.getByText("$15.000")).toBeTruthy();
  expect(screen.getByText("SV006")).toBeTruthy();
});
