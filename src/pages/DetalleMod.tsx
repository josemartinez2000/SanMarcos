import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function DetalleMod() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [inventario] = useState([
    // Servicios y Consultas
    {
      id: "SV001",
      nombre: "Consulta general",
      categoria: "Consultas",
      precio: "$15.000",
      stock: "N/A",
      imagen: "/img/Consulta general.jpg"
    },
    {
      id: "SV002",
      nombre: "Consulta urgencia",
      categoria: "Consultas",
      precio: "$25.000",
      stock: "N/A",
      imagen: "/img/Consulta urgencia.jpg"
    },
    {
      id: "SV003",
      nombre: "Control postoperatorio",
      categoria: "Consultas",
      precio: "$10.000",
      stock: "N/A",
      imagen: "/img/Control postoperatorio.jpg"
    },
    {
      id: "SV004",
      nombre: "Consulta ave / conejo",
      categoria: "Consultas",
      precio: "$18.000",
      stock: "N/A",
      imagen: "/img/Consulta ave conejo.jpg"
    },
    {
      id: "SV005",
      nombre: "Segunda opinión médica",
      categoria: "Consultas",
      precio: "$20.000",
      stock: "N/A",
      imagen: "/img/Segunda opinión médica.jpg"
    },

    // Cirugías
    {
      id: "CI001",
      nombre: "Esterilización hembra canina",
      categoria: "Cirugía",
      precio: "$80.000",
      stock: "N/A",
      imagen: "/img/Esterilización hembra canina.jpg"
    },
    {
      id: "CI002",
      nombre: "Esterilización macho canino",
      categoria: "Cirugía",
      precio: "$60.000",
      stock: "N/A",
      imagen: "/img/Esterilización macho canino.jpg"
    },
    {
      id: "CI003",
      nombre: "Esterilización hembra felina",
      categoria: "Cirugía",
      precio: "$65.000",
      stock: "N/A",
      imagen: "/img/Esterilización hembra felina.jpg"
    },
    {
      id: "CI004",
      nombre: "Esterilización macho felino",
      categoria: "Cirugía",
      precio: "$50.000",
      stock: "N/A",
      imagen: "/img/Esterilización macho felino.jpg"
    },
    {
      id: "CI005",
      nombre: "Extirpación de tumor cutáneo",
      categoria: "Cirugía",
      precio: "$120.000",
      stock: "N/A",
      imagen: "/img/Extirpación de tumor cutáneo.jpg"
    },
    {
      id: "CI006",
      nombre: "Cesárea de urgencia",
      categoria: "Cirugía",
      precio: "$180.000",
      stock: "N/A",
      imagen: "/img/Cesárea de urgencia.png"
    },

    // Desparasitación
    {
      id: "DE001",
      nombre: "Desparasitación interna pequeños",
      categoria: "Desparasitación",
      precio: "$8.000",
      stock: "N/A",
      imagen: "/img/Desparasitación interna pequeños (0 kg).jpg"
    },
    {
      id: "DE002",
      nombre: "Desparasitación interna medianos",
      categoria: "Desparasitación",
      precio: "$9.500",
      stock: "N/A",
      imagen: "/img/Desparasitación interna medianos.jpg"
    },
    {
      id: "DE003",
      nombre: "Desparasitación interna grandes",
      categoria: "Desparasitación",
      precio: "$11.000",
      stock: "N/A",
      imagen: "/img/Desparasitación interna grandes.jpg"
    },
    {
      id: "DE004",
      nombre: "Desparasitación interna felina",
      categoria: "Desparasitación",
      precio: "$8.000",
      stock: "N/A",
      imagen: "/img/Desparasitación interna felina.jpg"
    },
    {
      id: "DE005",
      nombre: "Antiparasitario externo (pipeta)",
      categoria: "Desparasitación",
      precio: "$7.500",
      stock: "N/A",
      imagen: "/img/Antiparasitario externo.jpg"
    },

    // Exámenes
    {
      id: "EX001",
      nombre: "Hemograma completo",
      categoria: "Exámenes",
      precio: "$22.000",
      stock: "N/A",
      imagen: "/img/Hemograma completo.jpg"
    },
    {
      id: "EX002",
      nombre: "Perfil bioquímico completo",
      categoria: "Exámenes",
      precio: "$35.000",
      stock: "N/A",
      imagen: "/img/Perfil bioquímico completo.jpg"
    },
    {
      id: "EX003",
      nombre: "Radiografía (1 proyección)",
      categoria: "Exámenes",
      precio: "$28.000",
      stock: "N/A",
      imagen: "/img/Radiografía.jpg"
    },
    {
      id: "EX004",
      nombre: "Ecografía abdominal",
      categoria: "Exámenes",
      precio: "$45.000",
      stock: "N/A",
      imagen: "/img/Ecografía abdominal.jpg"
    },
    {
      id: "EX005",
      nombre: "Test de leishmaniasis",
      categoria: "Exámenes",
      precio: "$18.000",
      stock: "N/A",
      imagen: "/img/Test de leishmaniasis.jpg"
    },

    // Otros
    {
      id: "OT001",
      nombre: "Corte de uñas",
      categoria: "Otros",
      precio: "$5.000",
      stock: "N/A",
      imagen: "/img/Corte de uñas.jpg"
    },
    {
      id: "OT002",
      nombre: "Limpieza dental",
      categoria: "Otros",
      precio: "$55.000",
      stock: "N/A",
      imagen: "/img/Limpieza dental.jpg"
    },
    {
      id: "OT003",
      nombre: "Microchip identificación",
      categoria: "Otros",
      precio: "$15.000",
      stock: "N/A",
      imagen: "/img/Microchip identificación.jpg"
    },
    {
      id: "OT004",
      nombre: "Hospitalización (por día)",
      categoria: "Otros",
      precio: "$30.000",
      stock: "N/A",
      imagen: "/img/Hospitalización.jpg"
    },

    // Vacunas Clínicas
    {
      id: "VA001",
      nombre: "Vacuna antirrábica canina",
      categoria: "Vacunación",
      precio: "$12.000",
      stock: "50",
      imagen: "/img/Vacunaantirrábicacanina.jpg"
    },
    {
      id: "VA002",
      nombre: "Vacuna sextuple canina",
      categoria: "Vacunación",
      precio: "$18.000",
      stock: "35",
      imagen: "/img/Vacunasextuplecanina.png"
    },
    {
      id: "VA003",
      nombre: "Vacuna bivalente felina",
      categoria: "Vacunación",
      precio: "$15.000",
      stock: "40",
      imagen: "/img/Vacunabivalentefelina.jpg"
    },
    {
      id: "VA004",
      nombre: "Vacuna triple felina",
      categoria: "Vacunación",
      precio: "$17.000",
      stock: "25",
      imagen: "/img/Vacunatriplefelina.jpg"
    },
    {
      id: "VA005",
      nombre: "Vacuna Bordetella canina",
      categoria: "Vacunación",
      precio: "$14.000",
      stock: "30",
      imagen: "/img/VacunaBordetellacanina.jpg"
    },
    {
      id: "VA006",
      nombre: "Vacuna antirrábica felina",
      categoria: "Vacunación",
      precio: "$12.000",
      stock: "55",
      imagen: "/img/Vacuna antirrábica felina.jpg"
    },

    // Medicamentos y Suplementos
    {
      id: "ME001",
      nombre: "Amoxibay 250mg",
      categoria: "Antibióticos",
      precio: "$4.200",
      stock: "45",
      imagen: "/img/Amoxibay250mg.jpg"
    },
    {
      id: "ME002",
      nombre: "Enrox 50mg",
      categoria: "Antibióticos",
      precio: "$6.800",
      stock: "30",
      imagen: "/img/Enrox50mg.jpg"
    },
    {
      id: "ME003",
      nombre: "Metrobay 250mg",
      categoria: "Antibióticos",
      precio: "$3.900",
      stock: "28",
      imagen: "/img/Metrobay 250mg.png"
    },
    {
      id: "ME004",
      nombre: "Nexgard",
      categoria: "Antiparasitarios",
      precio: "$9.500",
      stock: "60",
      imagen: "/img/Nexgard.jpg"
    },
    {
      id: "ME005",
      nombre: "Bravecto",
      categoria: "Antiparasitarios",
      precio: "$18.900",
      stock: "40",
      imagen: "/img/Bravecto.png"
    },
    {
      id: "ME006",
      nombre: "Revolution Plus",
      categoria: "Antiparasitarios",
      precio: "$14.500",
      stock: "35",
      imagen: "/img/Revolution Plus.jpg"
    },
    {
      id: "ME007",
      nombre: "Drontal Plus",
      categoria: "Antiparasitarios",
      precio: "$3.200",
      stock: "80",
      imagen: "/img/Drontal Plus.jpg"
    },
    {
      id: "ME008",
      nombre: "Milbemax Gato",
      categoria: "Antiparasitarios",
      precio: "$6.800",
      stock: "50",
      imagen: "/img/Milbemax Gato.jpg"
    },
    {
      id: "ME009",
      nombre: "Meloxicam 1mg",
      categoria: "Antiinflamatorios",
      precio: "$4.500",
      stock: "55",
      imagen: "/img/Meloxicam 1mg.jpeg"
    },
    {
      id: "ME010",
      nombre: "Carprofen 50mg",
      categoria: "Antiinflamatorios",
      precio: "$9.800",
      stock: "30",
      imagen: "/img/Carprofen50mg.png"
    },
    {
      id: "ME011",
      nombre: "Clorhexidina shampoo",
      categoria: "Dermatología",
      precio: "$8.900",
      stock: "25",
      imagen: "/img/Clorhexidina shampoo.jpg"
    },
    {
      id: "ME012",
      nombre: "Malaseb shampoo",
      categoria: "Dermatología",
      precio: "$12.500",
      stock: "20",
      imagen: "/img/Malaseb shampoo.jpg"
    },
    {
      id: "ME013",
      nombre: "Apoquel 16mg",
      categoria: "Dermatología",
      precio: "$22.000",
      stock: "18",
      imagen: "/img/Apoquel 16mg.jpg"
    },
    {
      id: "ME014",
      nombre: "Probifor",
      categoria: "Digestivo",
      precio: "$5.600",
      stock: "40",
      imagen: "/img/Probifor.jpeg"
    },
    {
      id: "ME015",
      nombre: "Omeprazol 10mg vet",
      categoria: "Digestivo",
      precio: "$3.800",
      stock: "35",
      imagen: "/img/Omeprazol 10mg vet.jpg"
    },
    {
      id: "ME016",
      nombre: "Vetmedin 2.5mg",
      categoria: "Cardíaco",
      precio: "$28.000",
      stock: "15",
      imagen: "/img/Vetmedin 2.5mg.jpg"
    },
    {
      id: "ME017",
      nombre: "Tramadol 50mg vet",
      categoria: "Analgésicos",
      precio: "$5.200",
      stock: "22",
      imagen: "/img/Tramadol 50mg vet.jpg"
    },
    {
      id: "ME018",
      nombre: "Nobivac DHPPi",
      categoria: "Vacunas",
      precio: "$8.500",
      stock: "48",
      imagen: "/img/Nobivac DHPPi.png"
    },
    {
      id: "ME019",
      nombre: "Nobivac Rabies",
      categoria: "Vacunas",
      precio: "$5.800",
      stock: "60",
      imagen: "/img/Nobivac Rabies.jpg"
    },
    {
      id: "ME020",
      nombre: "Felocell CVR",
      categoria: "Vacunas",
      precio: "$7.200",
      stock: "36",
      imagen: "/img/Felocell CVR.jpg"
    },
    {
      id: "ME021",
      nombre: "Omega vet 3-6-9",
      categoria: "Suplementos",
      precio: "$9.900",
      stock: "30",
      imagen: "/img/Omega.png"
    },
    {
      id: "ME022",
      nombre: "Condrovet forte",
      categoria: "Suplementos",
      precio: "$14.500",
      stock: "25",
      imagen: "/img/Condrovetforte.jpg"
    }
  ]);

  const producto = inventario.find((item) => item.id === id);

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-4">No se encontró el producto.</h2>
        <p>Por favor, vuelve al inventario y selecciona un servicio o medicamento.</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/modificaciones')}>
          Volver al Inventario
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Detalle del Servicio / Producto</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="caja-info text-center shadow-sm" style={{ backgroundColor: '#ffffff' }}>
            
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="img-fluid rounded mb-3" 
              style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }} 
            />
            
            <h2 className="mb-2 fw-bold">{producto.nombre}</h2>
            <p className="fs-4 fw-bold mb-2 text-success">Precio: {producto.precio}</p>
            <p className="text-muted mb-1">Categoría: {producto.categoria}</p>
            <p className="text-muted mb-4">Stock disponible: {producto.stock}</p>
            
            <div className="d-flex justify-content-center gap-3">
              <button 
                className="btn btn-primary px-4" 
                onClick={() => alert('No hay base de datos conectada para editar aún.')}
              >
                Editar
              </button>
              <button 
                className="btn btn-secondary px-4" 
                onClick={() => navigate('/modificaciones')}
              >
                Volver
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}