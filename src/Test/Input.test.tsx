// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../atoms/Input";

test("el input muestra el valor recibido y ejecuta onChange al escribir", () => {
  const cambiarTexto = vi.fn();

  render(<Input tipo="text" valor="Consulta" onChange={cambiarTexto} />);

  const input = screen.getByDisplayValue("Consulta") as HTMLInputElement;
  expect(input.value).toBe("Consulta");

  fireEvent.change(input, { target: { value: "Vacuna" } });
  expect(cambiarTexto).toHaveBeenCalledTimes(1);
});