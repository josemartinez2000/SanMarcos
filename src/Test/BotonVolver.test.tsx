// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BotonVolver from "../atoms/BotonVolver";

test("el botón volver muestra el texto Volver", () => {
  render(
    <MemoryRouter>
      <BotonVolver />
    </MemoryRouter>
  );

  const boton = screen.getByText("Volver");

  expect(boton.textContent).toBe("Volver");
});