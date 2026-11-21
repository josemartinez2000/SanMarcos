// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modificaciones from "../pages/Modificaciones";
import { simularFetch } from "./mockFetch";

test("la página de modificaciones muestra el título del inventario y los productos cargados desde la API", async () => {
  // Aquí se simulan las respuestas de servicios-service y medicamentos-service
  simularFetch({
    "http://localhost:8083/api/servicios": {
      datos: [
        { id: 1, codigo: "SV001", nombre: "Consulta general", categoria: "Consultas", precio: 15000, duracion: "30 min", imagen: "/img/Consulta general.jpg", detalles: "" }
      ]
    },
    "http://localhost:8082/api/medicamentos": {
      datos: [
        { id: 4, codigo: "ME004", nombre: "Nexgard", categoria: "Antiparasitarios", precio: 9500, stock: 60, imagen: "/img/Nexgard.jpg", detalles: "" }
      ]
    }
  });

  // Aquí se renderiza la página Modificaciones dentro de MemoryRouter
  render(
    <MemoryRouter>
      <Modificaciones />
    </MemoryRouter>
  );

  // Aquí se busca el título principal de la vista de inventario
  const titulo = screen.getByText("Vista Catálogo (Inventario)");
  expect(titulo.textContent).toBe("Vista Catálogo (Inventario)");

  // Aquí se verifica que el servicio y el medicamento se carguen en pantalla
  const servicio = await screen.findByText("Consulta general");
  expect(servicio.textContent).toBe("Consulta general");

  const medicamento = await screen.findByText("Nexgard");
  expect(medicamento.textContent).toBe("Nexgard");
});
