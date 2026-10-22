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
    },
    { 
        id: "ME002", 
        nombre: "Enrox 50mg", 
        categoria: "Antibióticos", 
        tipo: "Medicamento", 
        precio: "$6.800", 
        imagen: "/img/Enrox50mg.jpg", 
        detalles: "Principio Activo: Enrofloxacino - Stock: 30" 
    },
    { 
        id: "ME003", 
        nombre: "Metrobay 250mg", 
        categoria: "Antibióticos", 
        tipo: "Medicamento", 
        precio: "$3.900", 
        imagen: "/img/Metrobay 250mg.png", 
        detalles: "Principio Activo: Metronidazol - Stock: 28" 
    },
    { 
        id: "ME004", 
        nombre: "Nexgard", 
        categoria: "Antiparasitarios", 
        tipo: "Medicamento", 
        precio: "$9.500", 
        imagen: "/img/Nexgard.jpg", 
        detalles: "Principio Activo: Afoxolaner - Stock: 60" 
    },
    { 
        id: "ME005", 
        nombre: "Bravecto", 
        categoria: "Antiparasitarios", 
        tipo: "Medicamento", 
        precio: "$18.900", 
        imagen: "/img/Bravecto.png", 
        detalles: "Principio Activo: Fluralaner - Stock: 40" 
    },
    { 
        id: "ME006", 
        nombre: "Revolution Plus", 
        categoria: "Antiparasitarios", 
        tipo: "Medicamento", 
        precio: "$14.500", 
        imagen: "/img/Revolution Plus.jpg", 
        detalles: "Principio Activo: Selamectina+Sarolaner - Stock: 35" 
    },
    { 
        id: "ME007", 
        nombre: "Drontal Plus", 
        categoria: "Antiparasitarios", 
        tipo: "Medicamento", 
        precio: "$3.200", 
        imagen: "/img/Drontal Plus.jpg", 
        detalles: "Principio Activo: Praziquantel+Pamoato - Stock: 80" 
    },
    { 
        id: "ME008", 
        nombre: "Milbemax Gato", 
        categoria: "Antiparasitarios", 
        tipo: "Medicamento", 
        precio: "$6.800", 
        imagen: "/img/Milbemax Gato.jpg", 
        detalles: "Principio Activo: Milbemicina+Praziq. - Stock: 50" 
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
            rutaBase="/detalle-med" 
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MedVac;