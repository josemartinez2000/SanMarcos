import Footer from '../organism/Footer';
import CardMedicamento from '../molecules/CardMedicamento';

const catalogoMed = [
    { 
        id: "VA001", 
        nombre: "Vacuna antirrábica canina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$12.000", 
        imagen: "/img/Vacunaantirrábicacanina.jpg", 
        detalles: "Obligatoria por ley - Duración: 10 min" 
    },
    { 
        id: "VA002", 
        nombre: "Vacuna sextuple canina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$18.000", 
        imagen: "/img/Vacunasextuplecanina.png", 
        detalles: "Refuerzo anual - Duración: 10 min" 
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
            rutaBase="/detalle-med" // Indicamos que vaya a la vista de medicamentos
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MedVac;