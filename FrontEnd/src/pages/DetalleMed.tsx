import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetalleProducto, { type ProductoDetalle } from '../organism/DetalleProducto';
import { API_MEDICAMENTOS, formatearPrecio, type Medicamento } from '../services/api';

// Ítem guardado por la tarjeta del catálogo, se usa como respaldo mientras responde el backend
function leerRespaldo(id?: string): ProductoDetalle | null {
  try {
    const guardado = JSON.parse(localStorage.getItem('productoSeleccionado') ?? 'null');
    return guardado && guardado.id === id ? guardado : null;
  } catch {
    return null;
  }
}

function DetalleMed() {
  const { id } = useParams();

  const [producto, setProducto] = useState<ProductoDetalle | null>(() => leerRespaldo(id));
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Siempre se consulta el backend para mostrar el precio y stock actualizados
  useEffect(() => {
    const cargarMedicamento = async () => {
      try {
        const respuesta = await fetch(`${API_MEDICAMENTOS}/${id}`);
        if (!respuesta.ok) {
          throw new Error('Medicamento no encontrado');
        }
        const medicamento: Medicamento = await respuesta.json();
        setProducto({
          id: String(medicamento.id),
          codigo: medicamento.codigo,
          nombre: medicamento.nombre,
          categoria: medicamento.categoria,
          precio: formatearPrecio(medicamento.precio),
          imagen: medicamento.imagen,
          detalles: medicamento.detalles,
          extra: medicamento.stock > 0 ? `Stock disponible: ${medicamento.stock}` : 'Sin stock por el momento'
        });
        setError('');
      } catch {
        setError('No se pudo obtener la información actualizada del producto desde el servidor.');
      } finally {
        setCargando(false);
      }
    };
    cargarMedicamento();
  }, [id]);

  return (
    <DetalleProducto
      titulo="Detalle del Producto"
      producto={producto}
      cargando={cargando}
      error={error}
      rutaVolver="/med-vac"
      textoVolver="Volver al Catálogo"
    />
  );
}

export default DetalleMed;
