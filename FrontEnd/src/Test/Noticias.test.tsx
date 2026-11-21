// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Noticias from "../pages/Noticias";
import { simularFetch } from "./mockFetch";

test("la vista de noticias muestra las noticias obtenidas desde noticias-service", async () => {
  localStorage.clear();
  simularFetch({
    "http://localhost:8085/api/noticias": {
      datos: [
        { id: 1, titulo: "Campaña de vacunación gratuita", resumen: "Vacunas antirrábicas sin costo", contenido: "Fecha: Todo septiembre 2026", imagen: "/img/noticia1.jpg", fechaPublicacion: "2026-09-01" }
      ]
    }
  });

  render(
    <MemoryRouter>
      <Noticias />
    </MemoryRouter>
  );

  const titulo = await screen.findByText("Campaña de vacunación gratuita");
  expect(titulo.textContent).toBe("Campaña de vacunación gratuita");

  // Un visitante sin sesión de administrador no ve el formulario de publicación
  expect(screen.queryByText("Publicar nueva noticia")).toBeNull();
});
