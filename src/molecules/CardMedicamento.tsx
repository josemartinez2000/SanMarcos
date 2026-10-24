import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
  detalles?: string;
  rutaBase?: string;
}

export default function CardMedicamento({
  id,
  nombre,
  categoria,
  precio,
  imagen,
  detalles,
  rutaBase = '/detalle'
}: Props) {
  const navigate = useNavigate();

  const irADetalle = () => {
    const item = { id, nombre, categoria, precio, imagen, detalles };
    localStorage.setItem('productoSeleccionado', JSON.stringify(item));
    navigate(`${rutaBase}/${id}`);
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm d-flex flex-column justify-content-between overflow-hidden"
      style={{
        backgroundColor: '#223526',
        color: '#F5F1E6',
        borderRadius: '10px',
        width: '100%'
      }}
    >
      {/* Recuadro superior blanco para la imagen */}
      <div
        className="d-flex align-items-center justify-content-center p-2"
        style={{
          backgroundColor: '#ffffff',
          height: '190px',
          width: '100%'
        }}
      >
        <img
          src={imagen}
          alt={nombre}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Información del servicio/medicamento abajo */}
      <div className="p-3 d-flex flex-column justify-content-between flex-grow-1 text-start">
        <div>
          <h6 className="fw-bold mb-1" style={{ color: '#ffffff', minHeight: '40px' }}>
            {nombre}
          </h6>
          <span className="d-block" style={{ color: '#A8C6B0', fontSize: '0.8rem' }}>
            Precio:
          </span>
          <p className="fs-4 fw-bold mb-2" style={{ color: '#ffffff' }}>
            {precio}
          </p>

          <div className="mb-3" style={{ fontSize: '0.82rem', color: '#d1dfd5' }}>
            <div><strong>Código:</strong> {id}</div>
            <div><strong>Categoría:</strong> {categoria}</div>
            {detalles && (
              <div className="mt-1">{detalles}</div>
            )}
          </div>
        </div>

        <button
          onClick={irADetalle}
          className="btn w-100 fw-bold text-uppercase mt-2"
          style={{
            backgroundColor: '#F5F1E6',
            color: '#223526',
            borderRadius: '6px',
            fontSize: '0.85rem',
            padding: '8px 0'
          }}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}