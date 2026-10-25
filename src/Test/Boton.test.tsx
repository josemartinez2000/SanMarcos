// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Boton from "../atoms/Boton";

test("el botón muestra el texto Guardar Producto recibido por props", () => {
  // Aquí se renderiza el componente Boton pasando el texto y una función vacía
  render(<Boton texto="Guardar Producto" onClick={() => {}} />);

  // Aquí se busca el botón en pantalla por su texto
  const boton = screen.getByText("Guardar Producto");

  // Aquí se comprueba que el contenido de texto del botón coincida exactamente con lo esperado
  expect(boton.textContent).toBe("Guardar Producto");
});

test("el botón ejecuta la función onClick cuando se hace clic", () => {
  // Aquí se crea una función espía con vi.fn() para registrar las llamadas al evento
  const funcionClick = vi.fn();

  render(<Boton texto="Ingresar" onClick={funcionClick} />);

  // Aquí se dispara el evento de clic sobre el botón renderizado
  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  // Aquí se verifica que la función haya sido llamada una vez
  expect(funcionClick).toHaveBeenCalledTimes(1);
});