import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
}

function CardMedicamento({ id, nombre, categoria, precio, imagen }: CardProps) {
  return (
    <div className="producto-card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{categoria}</p>
      <p className="precio-card" style={{ fontWeight: 'bold' }}>{precio}</p>
      
      {/* Esto reemplaza tu antigua función onclick="verDetalle()" */}
      <Link to={`/detalle/${id}`} className="btn-detalles boton-opcion" style={{ textDecoration: 'none' }}>
        Ver detalle
      </Link>
    </div>
  );
}

export default CardMedicamento;