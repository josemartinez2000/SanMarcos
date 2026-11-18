// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "../atoms/Input";

test("el input muestra el valor inicial recibido por props", () => {
  render(<Input tipo="text" valor="Consulta general" onChange={() => {}} />);

  const input = screen.getByDisplayValue("Consulta general") as HTMLInputElement;

  expect(input.value).toBe("Consulta general");
});