import Footer from '../organism/Footer';
import CardMedicamento from '../molecules/CardMedicamento';

const catalogo = [
    { 
        id: "SV001", 
        nombre: "Consulta general", 
        categoria: "Consultas", 
        tipo: "Servicio", precio: "$15.000", 
        imagen: "/img/Consulta general.jpg", 
        detalles: "Duración: 30 min" },
    { 
        id: "SV002", 
        nombre: "Consulta urgencia", 
        categoria: "Consultas", 
        tipo: "Servicio", 
        precio: "$25.000", 
        imagen: "/img/Consulta urgencia.jpg", 
        detalles: "Fuera de horario +$10.000 - Duración: 30 min"
     },
    {
         id: "SV003", 
         nombre: "Control postoperatorio", 
         categoria: "Consultas", 
         tipo: "Servicio", precio: "$10.000", 
         imagen: "/img/Control postoperatorio.jpg", 
         detalles: "Duración: 20 min" 
    },
    { 
        id: "SV004", 
        nombre: "Consulta ave / conejo", 
        categoria: "Consultas", 
        tipo: "Servicio", 
        precio: "$18.000", 
        imagen: "/img/Consulta ave conejo.jpg",
         detalles: "Duración: 30 min" 
    },
    { 
        id: "SV005", 
        nombre: "Segunda opinión médica", 
        categoria: "Consultas", 
        tipo: "Servicio", 
        precio: "$20.000", 
        imagen: "/img/Segunda opinión médica.jpg", 
        detalles: "Requiere ficha previa - Duración: 40 min" 
    },
    { 
        id: "CI001", 
        nombre: "Esterilización hembra canina", 
        categoria: "Cirugía", 
        tipo: "Servicio", 
        precio: "$80.000", 
        imagen: "/img/Esterilización hembra canina.jpg", 
        detalles: "Incluye anestesia y hospitalización 24h - Duración: 90 min"
    },
    { 
        id: "CI002", 
        nombre: "Esterilización macho canino", 
        categoria: "Cirugía", 
        tipo: "Servicio", 
        precio: "$60.000", 
        imagen: "/img/Esterilización macho canino.jpg", 
        detalles: "Incluye anestesia - Duración: 60 min" 
    },
    { 
        id: "CI003", 
        nombre: "Esterilización hembra felina", 
        categoria: "Cirugía", 
        tipo: "Servicio", 
        precio: "$65.000", 
        imagen: "/img/Esterilización hembra felina.jpg", 
        detalles: "Incluye anestesia y hospitalización 12h - Duración: 60 min" 
    },
    {
         id: "CI004", 
         nombre: "Esterilización macho felino", 
         categoria: "Cirugía", 
         tipo: "Servicio", 
         precio: "$50.000", 
         imagen: "/img/Esterilización macho felino.jpg", 
         detalles: "Incluye anestesia - Duración: 45 min" 
        },
    { 
        id: "CI005", 
        nombre: "Extirpación de tumor cutáneo", 
        categoria: "Cirugía", 
        tipo: "Servicio",
         precio: "$120.000", 
         imagen: "/img/Extirpación de tumor cutáneo.jpg", 
         detalles: "Precio referencial; varía según tamaño - Duración: 60 min" 
        },
    { 
        id: "CI006", 
        nombre: "Cesárea de urgencia",
        categoria: "Cirugía", 
        tipo: "Servicio", 
        precio: "$180.000", 
        imagen: "/img/Cesárea de urgencia.png", 
        detalles: "Duración: 120 min" 
    },
    { 
        id: "DE001", 
        nombre: "Desparasitación interna pequeños (<10 kg)", 
        categoria: "Desparasitación", 
        tipo: "Servicio", 
        precio: "$8.000", 
        imagen: "/img/Desparasitación interna pequeños (0 kg).jpg", 
        detalles: "Duración: 5 min" 
    },
    { 
        id: "DE002", 
        nombre: "Desparasitación interna medianos (10-25 kg)", 
        categoria: "Desparasitación", 
        tipo: "Servicio", 
        precio: "$9.500", 
        imagen: "/img/Desparasitación interna medianos.jpg", 
        detalles: "Duración: 5 min" 
    },
    { 
        id: "DE003", 
        nombre: "Desparasitación interna grandes (>25 kg)", 
        categoria: "Desparasitación", 
        tipo: "Servicio", 
        precio: "$11.000", 
        imagen: "/img/Desparasitación interna grandes.jpg", 
        detalles: "Duración: 5 min" 
    },
    { 
        id: "DE004", 
        nombre: "Desparasitación interna felina", 
        categoria: "Desparasitación", 
        tipo: "Servicio", 
        precio: "$8.000", 
        imagen: "/img/Desparasitación interna felina.jpg", 
        detalles: "Duración: 5 min" 
    },
    { 
        id: "DE005", 
        nombre: "Antiparasitario externo (pipeta)", 
        categoria: "Desparasitación", 
        tipo: "Servicio", 
        precio: "$7.500", 
        imagen: "/img/Antiparasitario externo.jpg", 
        detalles: "Incluye aplicación - Duración: 5 min" 
    },
    { 
        id: "EX001", 
        nombre: "Hemograma completo", 
        categoria: "Exámenes", 
        tipo: "Servicio", 
        precio: "$22.000", 
        imagen: "/img/Hemograma completo.jpg", 
        detalles: "Resultado en 24-48 h - Duración: 30 min" 
    },
    { 
        id: "EX002", 
        nombre: "Perfil bioquímico completo", 
        categoria: "Exámenes", 
        tipo: "Servicio", 
        precio: "$35.000", 
        imagen: "/img/Perfil bioquímico completo.jpg", 
        detalles: "Resultado en 24-48 h - Duración: 30 min" 
    },
    { 
        id: "EX003", 
        nombre: "Radiografía (1 proyección)", 
        categoria: "Exámenes", 
        tipo: "Servicio", 
        precio: "$28.000", 
        imagen: "/img/Radiografía.jpg", 
        detalles: "Duración: 20 min" 
    },
    { 
        id: "EX004", 
        nombre: "Ecografía abdominal", 
        categoria: "Exámenes", 
        tipo: "Servicio", 
        precio: "$45.000", 
        imagen: "/img/Ecografía abdominal.jpg", 
        detalles: "Duración: 30 min" 
    },
    { 
        id: "EX005", 
        nombre: "Test de leishmaniasis", 
        categoria: "Exámenes", 
        tipo: "Servicio", 
        precio: "$18.000", 
        imagen: "/img/Test de leishmaniasis.jpg", 
        detalles: "Duración: 20 min" 
    },
    { 
        id: "OT001", 
        nombre: "Corte de uñas", 
        categoria: "Otros", 
        tipo: "Servicio", 
        precio: "$5.000", 
        imagen: "/img/Corte de uñas.jpg", 
        detalles: "Duración: 15 min" 
    },
    { 
        id: "OT002", 
        nombre: "Limpieza dental", 
        categoria: "Otros", 
        tipo: "Servicio", 
        precio: "$55.000", 
        imagen: "/img/Limpieza dental.jpg", 
        detalles: "Requiere anestesia - Duración: 45 min" 
    },
    { 
        id: "OT003", 
        nombre: "Microchip identificación", 
        categoria: "Otros", 
        tipo: "Servicio", 
        precio: "$15.000", 
        imagen: "/img/Microchip identificación.jpg", 
        detalles: "Incluye registro - Duración: 10 min" 
    },
    { 
        id: "OT004", 
        nombre: "Hospitalización (por día)", 
        categoria: "Otros", 
        tipo: "Servicio", 
        precio: "$30.000", 
        imagen: "/img/Hospitalización.jpg", 
        detalles: "Incluye monitoreo y alimentación básica - Duración: 24 h" 
    }
];

function Catalogo() {
  return (
    <>
      <header className="catalogo-header">
        <h1>Catálogo de Servicios</h1>
        <p>Encuentra la mejor atención y servicios para tu mascota</p>
      </header>

      <div className="catalogo-container" id="catalogo">
        {catalogo.map((producto) => (
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

export default Catalogo;