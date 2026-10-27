// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../organism/Navbar";

test("el navbar muestra el saludo cuando hay un usuario en localStorage", () => {
  // Aquí se guarda un usuario cliente en localStorage para simular la sesión iniciada
  localStorage.clear();
  localStorage.setItem("usuarioLogueado", "cliente@gmail.com");
  localStorage.setItem("rolUsuario", "cliente");

  // Aquí se renderiza el componente Navbar dentro de MemoryRouter
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Aquí se busca el texto de bienvenida y se comprueba que muestre el correo del usuario
  const saludo = screen.getByText("Hola, cliente@gmail.com");
  expect(saludo.textContent).toBe("Hola, cliente@gmail.com");
});

test("el navbar muestra la pestaña Panel Admin cuando el rol es admin", () => {
  // Aquí se guarda el rol admin en localStorage para activar el menú de administrador
  localStorage.clear();
  localStorage.setItem("usuarioLogueado", "admin@sanmarcos.cl");
  localStorage.setItem("rolUsuario", "admin");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Aquí se verifica que aparezca el botón Panel Admin en la barra de navegación
  const botonAdmin = screen.getByText("Panel Admin");
  expect(botonAdmin.textContent).toBe("Panel Admin");
});