// URLs base de cada microservicio del backend
export const API_CLIENTES = 'http://localhost:8081/api/clientes';
export const API_MEDICAMENTOS = 'http://localhost:8082/api/medicamentos';
export const API_SERVICIOS = 'http://localhost:8083/api/servicios';
export const API_FICHAS = 'http://localhost:8084/api/fichas';
export const API_MASCOTAS = 'http://localhost:8084/api/mascotas';
export const API_NOTICIAS = 'http://localhost:8085/api/noticias';

// Modelos que devuelve el backend
export interface Cliente {
  id: number;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  rol: 'ADMIN' | 'CLIENTE';
  fechaRegistro: string;
}

export interface Medicamento {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string;
  detalles: string;
  // Versión para el control de concurrencia: se devuelve tal cual al editar
  version: number;
}

// Respuesta del login: token JWT y datos públicos del usuario
export interface LoginResponse {
  token: string;
  usuario: Cliente;
}

export interface Servicio {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  duracion: string;
  imagen: string;
  detalles: string;
}

export interface Mascota {
  id: number;
  correoCliente: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number | null;
}

export interface FichaMedica {
  id: number;
  mascota: Mascota;
  motivoConsulta: string;
  diagnostico: string;
  tratamiento: string;
  veterinario: string;
  estado: 'EN_ATENCION' | 'ALTA';
  fechaAtencion: string;
}

export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fechaPublicacion: string;
}

// Convierte 15000 en "$15.000"
export function formatearPrecio(precio: number): string {
  return '$' + precio.toLocaleString('es-CL');
}

// Lee el mensaje de error que envía el backend ({ mensaje: '...' }) o usa uno por defecto
export async function obtenerMensajeError(respuesta: Response, mensajePorDefecto: string): Promise<string> {
  try {
    const datos = await respuesta.json();
    if (datos && typeof datos.mensaje === 'string') {
      return datos.mensaje;
    }
  } catch {
    // La respuesta no trae JSON
  }
  // 401 sin mensaje del backend: falta el token o expiró, se limpia la sesión guardada
  if (respuesta.status === 401) {
    cerrarSesionGuardada();
    return 'Su sesión expiró. Inicie sesión nuevamente.';
  }
  if (respuesta.status === 403) {
    return 'No tiene permisos para realizar esta acción.';
  }
  return mensajePorDefecto;
}

// Encabezados para endpoints protegidos: agrega "Authorization: Bearer <token>" si hay sesión.
// No se usa en login, registro ni en las consultas públicas del catálogo.
export function encabezados(conJson = false): Record<string, string> {
  const cabeceras: Record<string, string> = {};
  if (conJson) {
    cabeceras['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token) {
    cabeceras['Authorization'] = `Bearer ${token}`;
  }
  return cabeceras;
}

// Datos de la sesión guardados en localStorage al iniciar sesión
export function obtenerSesion() {
  return {
    correo: localStorage.getItem('usuarioLogueado'),
    rol: (localStorage.getItem('rolUsuario') ?? '').toUpperCase(),
  };
}

export function cerrarSesionGuardada() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('usuarioLogueado');
  localStorage.removeItem('rolUsuario');
}
