// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BotonVolver from "../atoms/BotonVolver";

test("el componente BotonVolver se renderiza correctamente dentro de MemoryRouter", () => {
  const { container } = render(
    <MemoryRouter>
      <BotonVolver />
    </MemoryRouter>
  );

  expect(container.firstChild).not.toBeNull();
});