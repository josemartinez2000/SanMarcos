import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetalleProducto, { type ProductoDetalle } from '../organism/DetalleProducto';
import { API_SERVICIOS, formatearPrecio, type Servicio } from '../services/api';

// Ítem guardado por la tarjeta del catálogo, se usa como respaldo mientras responde el backend
function leerRespaldo(id?: string): ProductoDetalle | null {
  try {
    const guardado = JSON.parse(localStorage.getItem('productoSeleccionado') ?? 'null');
    return guardado && guardado.id === id ? guardado : null;
  } catch {
    return null;
  }
}

function Detalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState<ProductoDetalle | null>(() => leerRespaldo(id));
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Siempre se consulta el backend para mostrar los datos actualizados del servicio
  useEffect(() => {
    const cargarServicio = async () => {
      try {
        const respuesta = await fetch(`${API_SERVICIOS}/${id}`);
        if (!respuesta.ok) {
          throw new Error('Servicio no encontrado');
        }
        const servicio: Servicio = await respuesta.json();
        setProducto({
          id: String(servicio.id),
          codigo: servicio.codigo,
          nombre: servicio.nombre,
          categoria: servicio.categoria,
          precio: formatearPrecio(servicio.precio),
          imagen: servicio.imagen,
          detalles: servicio.detalles,
          extra: `Duración: ${servicio.duracion}`
        });
        setError('');
      } catch {
        setError('No se pudo obtener la información actualizada del servicio desde el servidor.');
      } finally {
        setCargando(false);
      }
    };
    cargarServicio();
  }, [id]);

  return (
    <DetalleProducto
      titulo="Detalle del Servicio"
      producto={producto}
      cargando={cargando}
      error={error}
      rutaVolver="/catalogo"
      textoVolver="Volver a los servicios"
    />
  );
}

export default Detalle;
