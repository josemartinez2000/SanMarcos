// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Ficha from "../pages/Ficha";
import { simularFetch } from "./mockFetch";

test("el cliente ve en modo lectura sus mascotas y fichas médicas", async () => {
  // Aquí se simula la sesión de un cliente
  localStorage.clear();
  localStorage.setItem("usuarioLogueado", "cliente@gmail.com");
  localStorage.setItem("rolUsuario", "CLIENTE");

  const firulais = { id: 1, correoCliente: "cliente@gmail.com", nombre: "Firulais", especie: "Perro", raza: "Labrador retriever", edad: 5 };

  const fetchSimulado = simularFetch({
    "http://localhost:8084/api/mascotas/cliente/": { datos: [firulais] },
    "http://localhost:8084/api/fichas/cliente/": {
      datos: [
        { id: 1, mascota: firulais, motivoConsulta: "Control anual y vacunación", diagnostico: "Paciente sano", tratamiento: "Vacuna sextuple", veterinario: "Dra. Fernanda Muñoz", estado: "ALTA", fechaAtencion: "2026-08-12" }
      ]
    }
  });

  render(
    <MemoryRouter>
      <Ficha />
    </MemoryRouter>
  );

  expect(await screen.findByText("Firulais")).toBeTruthy();
  expect(screen.getByText("Control anual y vacunación")).toBeTruthy();

  // Se consulta el endpoint de fichas por correo del dueño
  expect(fetchSimulado).toHaveBeenCalledWith("http://localhost:8084/api/fichas/cliente/cliente%40gmail.com");

  // En modo cliente no aparecen botones de edición
  expect(screen.queryByText("Editar ficha")).toBeNull();
});
