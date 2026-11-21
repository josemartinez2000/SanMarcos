import { useEffect, useState } from 'react';
import GrillaCatalogo, { type ItemCatalogo } from '../organism/GrillaCatalogo';
import { API_SERVICIOS, formatearPrecio, type Servicio } from '../services/api';

function Catalogo() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Se consulta el catálogo de servicios a servicios-service al cargar la página
  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const respuesta = await fetch(API_SERVICIOS);
        if (!respuesta.ok) {
          throw new Error('Error al consultar servicios');
        }
        setServicios(await respuesta.json());
      } catch {
        setError('No se pudieron cargar los servicios. Verifique que servicios-service (puerto 8083) esté activo.');
      } finally {
        setCargando(false);
      }
    };
    cargarServicios();
  }, []);

  // Se adapta cada servicio al formato que usa la grilla del catálogo
  const items: ItemCatalogo[] = servicios.map((servicio) => ({
    id: String(servicio.id),
    codigo: servicio.codigo,
    nombre: servicio.nombre,
    categoria: servicio.categoria,
    precio: formatearPrecio(servicio.precio),
    imagen: servicio.imagen,
    detalles: `Duración: ${servicio.duracion}`
  }));

  return (
    <>
      <header className="catalogo-header container-fluid px-4 mt-4">
        <h1>Catálogo de Servicios</h1>
        <p>Encuentra la mejor atención y servicios para tu mascota</p>
      </header>

      {cargando && (
        <div className="container text-center my-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2">Cargando servicios...</p>
        </div>
      )}

      {error !== '' && (
        <div className="container my-4">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      )}

      {!cargando && error === '' && (
        <GrillaCatalogo items={items} rutaBase="/detalle" />
      )}
    </>
  );
}

export default Catalogo;
