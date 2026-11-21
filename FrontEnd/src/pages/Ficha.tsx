import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GestionFichas from '../organism/GestionFichas';
import HistorialMascotas from '../organism/HistorialMascotas';
import {
  API_FICHAS,
  API_MASCOTAS,
  obtenerSesion,
  type FichaMedica,
  type Mascota
} from '../services/api';

// Nombre del servicio/producto seleccionado en el catálogo ("Agregar a ficha")
function leerMotivoInicial(id?: string): string {
  if (!id) return '';
  try {
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado') ?? 'null');
    return producto && producto.id === id ? producto.nombre : '';
  } catch {
    return '';
  }
}

// Vista de solo lectura para el cliente: sus mascotas y fichas médicas
function FichasCliente({ correo }: { correo: string }) {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [fichas, setFichas] = useState<FichaMedica[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarFichas = async () => {
      try {
        const correoUrl = encodeURIComponent(correo);
        const [respuestaFichas, respuestaMascotas] = await Promise.all([
          fetch(`${API_FICHAS}/cliente/${correoUrl}`),
          fetch(`${API_MASCOTAS}/cliente/${correoUrl}`)
        ]);
        if (!respuestaFichas.ok || !respuestaMascotas.ok) throw new Error();
        setFichas(await respuestaFichas.json());
        setMascotas(await respuestaMascotas.json());
      } catch {
        setError('No se pudieron cargar sus fichas médicas. Intente nuevamente más tarde.');
      } finally {
        setCargando(false);
      }
    };
    cargarFichas();
  }, [correo]);

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Cargando fichas médicas...</p>
      </div>
    );
  }

  if (error !== '') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return <HistorialMascotas mascotas={mascotas} fichas={fichas} />;
}

export default function Ficha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { correo, rol } = obtenerSesion();
  const esAdmin = rol === 'ADMIN';

  if (!correo) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-3">Fichas médicas</h2>
        <p>Debe iniciar sesión para ver las fichas médicas de sus mascotas.</p>
        <Link to="/login" className="btn boton-opcion">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <>
      {esAdmin && (
        <div style={{ backgroundColor: 'rgb(61, 61, 61)', padding: '10px 20px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/modificaciones')}>
            Volver
          </button>
        </div>
      )}

      <div className="container my-5">
        <h1 className="text-center mb-2 fw-bold">
          {esAdmin ? 'Gestión de Fichas Médicas' : 'Mis Fichas Médicas'}
        </h1>
        <p className="text-center text-muted mb-4">
          {esAdmin
            ? 'Seleccione un cliente para registrar mascotas y gestionar sus fichas.'
            : `Historial clínico de las mascotas asociadas a ${correo}`}
        </p>

        {esAdmin ? (
          <GestionFichas motivoInicial={leerMotivoInicial(id)} />
        ) : (
          <FichasCliente correo={correo} />
        )}

        <div className="botones d-flex justify-content-end gap-3 mt-4 mb-5">
          <button className="btn btn-outline-dark" onClick={() => window.print()}>
            🖨️ Imprimir Ficha
          </button>
          {!esAdmin && (
            <Link to="/" className="btn btn-secondary">
              Volver a la Página Principal
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
