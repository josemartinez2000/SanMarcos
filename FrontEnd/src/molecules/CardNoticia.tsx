interface CardNoticiaProps {
  imagen: string;
  titulo: string;
  descripcion: string;
}

function CardNoticia({ imagen, titulo, descripcion }: CardNoticiaProps) {
  return (
    <div className="card tarjeta-noticia">
      <img src={imagen} alt={titulo} className="img-noticia" />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
      </div>
    </div>
  );
}

export default CardNoticia;