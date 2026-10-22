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
    },
    { 
        id: "VA003", 
        nombre: "Vacuna bivalente felina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$15.000", 
        imagen: "/img/Vacunabivalentefelina.jpg", 
        detalles: "Refuerzo anual - Duración: 10 min" 
    },
    { 
        id: "VA004", 
        nombre: "Vacuna triple felina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$17.000", 
        imagen: "/img/Vacunatriplefelina.jpg", 
        detalles: "Refuerzo anual - Duración: 10 min" 
    },
    { 
        id: "VA005", 
        nombre: "Vacuna Bordetella canina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$14.000", 
        imagen: "/img/VacunaBordetellacanina.jpg", 
        detalles: "Tos de las perreras - Duración: 10 min" 
    },
    { 
        id: "VA006", 
        nombre: "Vacuna antirrábica felina", 
        categoria: "Vacunación", 
        tipo: "Servicio", 
        precio: "$12.000", 
        imagen: "/img/Vacuna antirrábica felina.jpg", 
        detalles: "Duración: 10 min" 
    },
    { 
        id: "ME001", 
        nombre: "Amoxibay 250mg", 
        categoria: "Antibióticos", 
        tipo: "Medicamento", 
        precio: "$4.200", 
        imagen: "/img/Amoxibay250mg.jpg", 
        detalles: "Principio Activo: Amoxicilina - Stock: 45" 
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