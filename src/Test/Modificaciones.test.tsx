// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modificaciones from "../pages/Modificaciones";

test("elimina un producto del inventario y filtra por categoría en Modificaciones", () => {
  // Aquí se renderiza la página de inventario envuelta en MemoryRouter
  render(
    <MemoryRouter>
      <Modificaciones />
    </MemoryRouter>
  );

  // Aquí se verifica que el primer servicio exista antes de eliminarlo
  const itemInicial = screen.getByText("Consulta general");
  expect(itemInicial.textContent).toBe("Consulta general");

  // Aquí se presiona el primer botón Eliminar para borrar el registro del estado
  const botonesEliminar = screen.getAllByRole("button", { name: "Eliminar" });
  fireEvent.click(botonesEliminar[0]);

  // Aquí se comprueba que el servicio eliminado ya no aparezca en la pantalla
  expect(screen.queryByText("Consulta general")).toBeNull();

  // Aquí se selecciona la categoría Cirugía en el filtro desplegable
  const selector = screen.getByRole("combobox");
  fireEvent.change(selector, { target: { value: "Cirugía" } });

  // Aquí se comprueba que se muestren los servicios correspondientes a Cirugía
  const cirugia = screen.getByText("Esterilización hembra canina");
  expect(cirugia.textContent).toBe("Esterilización hembra canina");
});