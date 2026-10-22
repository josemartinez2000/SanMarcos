import Footer from '../organism/Footer';
import CardMedicamento from '../molecules/CardMedicamento';


const catalogoMed = [
    { 
        id: "MV001", 
        nombre: "Vacuna Antirrábica", 
        categoria: "Vacunas", 
        precio: "$12.000", 
        imagen: "/img/antirrabica.jpg" 
    }
];

function MedVac() {
  return (
    <>
      <div className="catalogo-container mt-5 mb-5" id="catalogo_med">
        {catalogoMed.map((producto) => (
          <CardMedicamento
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            categoria={producto.categoria}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default MedVac;