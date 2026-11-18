// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Boton from "../atoms/Boton";

test("el botón muestra el texto Guardar Producto", () => {
  // Aquí se renderiza el componente Boton pasando el texto que se quiere mostrar
  render(<Boton texto="Guardar Producto" onClick={() => {}} />);

  // Aquí se busca el botón en la pantalla por su texto
  const boton = screen.getByText("Guardar Producto");

  // Aquí se comprueba que el texto dentro del botón sea exactamente Guardar Producto
  expect(boton.textContent).toBe("Guardar Producto");
});

test("el botón ejecuta la función cuando se hace clic", () => {
  // Aquí se crea una función espía para comprobar si el botón responde al clic
  const accion = vi.fn();

  render(<Boton texto="Ingresar" onClick={accion} />);

  // Aquí se simula el clic del usuario sobre el botón Ingresar
  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  // Aquí se verifica que la función se haya ejecutado
  expect(accion).toHaveBeenCalled();
});