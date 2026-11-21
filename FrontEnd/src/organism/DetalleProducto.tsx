import { Link } from 'react-router-dom';
import { obtenerSesion } from '../services/api';

export interface ProductoDetalle {
  id: string;
  codigo?: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
  detalles?: string;
  extra?: string;
}

interface Props {
  titulo: string;
  producto: ProductoDetalle | null;
  cargando: boolean;
  error: string;
  rutaVolver: string;
  textoVolver: string;
}

// Vista común para el detalle de un servicio o de un medicamento
export default function DetalleProducto({ titulo, producto, cargando, error, rutaVolver, textoVolver }: Props) {
  const esAdmin = obtenerSesion().rol === 'ADMIN';

  return (
    <div className="container mt-4 mb-5 text-center">
      <h1>{titulo}</h1>

      {cargando && !producto && (
        <div className="my-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2">Cargando detalle...</p>
        </div>
      )}

      {error !== '' && (
        <div className="alert alert-warning mx-auto mt-3" style={{ maxWidth: '600px' }}>{error}</div>
      )}

      {producto && (
        <>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: '300px' }}
          />

          <h2 className="mt-3">{producto.nombre}</h2>
          {producto.codigo && <p className="mb-1"><strong>Código:</strong> {producto.codigo}</p>}
          <p className="text-muted">{producto.categoria}</p>
          {producto.detalles && <p>{producto.detalles}</p>}
          {producto.extra && <p className="fw-bold">{producto.extra}</p>}
          <p className="fs-4 fw-bold">{producto.precio}</p>
        </>
      )}

      <div className="mt-4">
        {producto && esAdmin && (
          <Link to={`/ficha/${producto.id}`} className="boton-cuenta d-block mx-auto mb-2" style={{ textDecoration: 'none', width: '300px' }}>
            Agregar a ficha
          </Link>
        )}
        <Link to={rutaVolver} className="boton-opcion d-block mx-auto" style={{ textDecoration: 'none', width: '300px' }}>
          {textoVolver}
        </Link>
      </div>
    </div>
  );
}
