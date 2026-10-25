// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../organism/Navbar";

test("el navbar oculta la pestaña Panel Admin cuando inicia sesión un cliente normal", () => {
  // Aquí se limpia el localStorage y se guarda una sesión con rol de cliente
  localStorage.clear();
  localStorage.setItem("usuarioLogueado", "cliente@gmail.com");
  localStorage.setItem("rolUsuario", "cliente");

  // Aquí se renderiza la barra de navegación dentro de MemoryRouter
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Aquí se comprueba que aparezca el saludo al cliente y que Panel Admin sea nulo
  const saludo = screen.getByText("Hola, cliente@gmail.com");
  expect(saludo.textContent).toBe("Hola, cliente@gmail.com");
  expect(screen.queryByText("Panel Admin")).toBeNull();
});

test("el navbar muestra la pestaña Panel Admin cuando el rol en localStorage es admin", () => {
  // Aquí se configura en localStorage una sesión activa de administrador
  localStorage.clear();
  localStorage.setItem("usuarioLogueado", "admin@sanmarcos.cl");
  localStorage.setItem("rolUsuario", "admin");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Aquí se busca el botón exclusivo de administrador y se verifica su texto
  const pestañaAdmin = screen.getByText("Panel Admin");
  expect(pestañaAdmin.textContent).toBe("Panel Admin");
});