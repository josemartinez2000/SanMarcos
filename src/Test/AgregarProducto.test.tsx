// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AgregarProducto from "../pages/AgregarProducto";

test("muestra una alerta cuando faltan datos y guarda en localStorage al completar el producto", () => {
  localStorage.clear();

  const alerta = vi
    .spyOn(window, "alert")
    .mockImplementation(() => {});

  const { container } = render(
    <MemoryRouter>
      <AgregarProducto />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Guardar Producto" }));

  expect(alerta).toHaveBeenCalledWith("Por favor, complete al menos el ID, Nombre y Precio.");

  const inputs = container.querySelectorAll("input");
  fireEvent.change(inputs[0], { target: { value: "SV999" } });
  fireEvent.change(inputs[1], { target: { value: "Ecografía Doppler" } });
  fireEvent.change(inputs[2], { target: { value: "Exámenes" } });
  fireEvent.change(inputs[3], { target: { value: "$50.000" } });

  fireEvent.click(screen.getByRole("button", { name: "Guardar Producto" }));

  expect(localStorage.getItem("nuevoProducto")).toContain("Ecografía Doppler");

  alerta.mockRestore();
});