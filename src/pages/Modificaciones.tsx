import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Modificaciones() {
  const navigate = useNavigate();

  const [inventario, setInventario] = useState([
    // Servicios y Consultas
    {
      id: "SV001",
      nombre: "Consulta general",
      categoria: "Consultas",
      precio: "$15.000",
      stock: "N/A"
    },
    {
      id: "SV002",
      nombre: "Consulta urgencia",
      categoria: "Consultas",
      precio: "$25.000",
      stock: "N/A"
    },
    {
      id: "SV003",
      nombre: "Control postoperatorio",
      categoria: "Consultas",
      precio: "$10.000",
      stock: "N/A"
    },
    {
      id: "SV004",
      nombre: "Consulta ave / conejo",
      categoria: "Consultas",
      precio: "$18.000",
      stock: "N/A"
    },
    {
      id: "SV005",
      nombre: "Segunda opinión médica",
      categoria: "Consultas",
      precio: "$20.000",
      stock: "N/A"
    },

    // Cirugías
    {
      id: "CI001",
      nombre: "Esterilización hembra canina",
      categoria: "Cirugía",
      precio: "$80.000",
      stock: "N/A"
    },
    {
      id: "CI002",
      nombre: "Esterilización macho canino",
      categoria: "Cirugía",
      precio: "$60.000",
      stock: "N/A"
    },
    {
      id: "CI003",
      nombre: "Esterilización hembra felina",
      categoria: "Cirugía",
      precio: "$65.000",
      stock: "N/A"
    },
    {
      id: "CI004",
      nombre: "Esterilización macho felino",
      categoria: "Cirugía",
      precio: "$50.000",
      stock: "N/A"
    },
    {
      id: "CI005",
      nombre: "Extirpación de tumor cutáneo",
      categoria: "Cirugía",
      precio: "$120.000",
      stock: "N/A"
    },
    {
      id: "CI006",
      nombre: "Cesárea de urgencia",
      categoria: "Cirugía",
      precio: "$180.000",
      stock: "N/A"
    },

    // Desparasitación
    {
      id: "DE001",
      nombre: "Desparasitación interna pequeños",
      categoria: "Desparasitación",
      precio: "$8.000",
      stock: "N/A"
    },
    {
      id: "DE002",
      nombre: "Desparasitación interna medianos",
      categoria: "Desparasitación",
      precio: "$9.500",
      stock: "N/A"
    },
    {
      id: "DE003",
      nombre: "Desparasitación interna grandes",
      categoria: "Desparasitación",
      precio: "$11.000",
      stock: "N/A"
    },
    {
      id: "DE004",
      nombre: "Desparasitación interna felina",
      categoria: "Desparasitación",
      precio: "$8.000",
      stock: "N/A"
    },
    {
      id: "DE005",
      nombre: "Antiparasitario externo (pipeta)",
      categoria: "Desparasitación",
      precio: "$7.500",
      stock: "N/A"
    },

    // Exámenes
    {
      id: "EX001",
      nombre: "Hemograma completo",
      categoria: "Exámenes",
      precio: "$22.000",
      stock: "N/A"
    },
    {
      id: "EX002",
      nombre: "Perfil bioquímico completo",
      categoria: "Exámenes",
      precio: "$35.000",
      stock: "N/A"
    },
    {
      id: "EX003",
      nombre: "Radiografía (1 proyección)",
      categoria: "Exámenes",
      precio: "$28.000",
      stock: "N/A"
    },
    {
      id: "EX004",
      nombre: "Ecografía abdominal",
      categoria: "Exámenes",
      precio: "$45.000",
      stock: "N/A"
    },
    {
      id: "EX005",
      nombre: "Test de leishmaniasis",
      categoria: "Exámenes",
      precio: "$18.000",
      stock: "N/A"
    },

    // Otros
    {
      id: "OT001",
      nombre: "Corte de uñas",
      categoria: "Otros",
      precio: "$5.000",
      stock: "N/A"
    },
    {
      id: "OT002",
      nombre: "Limpieza dental",
      categoria: "Otros",
      precio: "$55.000",
      stock: "N/A"
    },
    {
      id: "OT003",
      nombre: "Microchip identificación",
      categoria: "Otros",
      precio: "$15.000",
      stock: "N/A"
    },
    {
      id: "OT004",
      nombre: "Hospitalización (por día)",
      categoria: "Otros",
      precio: "$30.000",
      stock: "N/A"
    },

    // Vacunas Clínicas
    {
      id: "VA001",
      nombre: "Vacuna antirrábica canina",
      categoria: "Vacunación",
      precio: "$12.000",
      stock: "50"
    },
    {
      id: "VA002",
      nombre: "Vacuna sextuple canina",
      categoria: "Vacunación",
      precio: "$18.000",
      stock: "35"
    },
    {
      id: "VA003",
      nombre: "Vacuna bivalente felina",
      categoria: "Vacunación",
      precio: "$15.000",
      stock: "40"
    },
    {
      id: "VA004",
      nombre: "Vacuna triple felina",
      categoria: "Vacunación",
      precio: "$17.000",
      stock: "25"
    },
    {
      id: "VA005",
      nombre: "Vacuna Bordetella canina",
      categoria: "Vacunación",
      precio: "$14.000",
      stock: "30"
    },
    {
      id: "VA006",
      nombre: "Vacuna antirrábica felina",
      categoria: "Vacunación",
      precio: "$12.000",
      stock: "55"
    },

    // Medicamentos y Suplementos
    {
      id: "ME001",
      nombre: "Amoxibay 250mg",
      categoria: "Antibióticos",
      precio: "$4.200",
      stock: "45"
    },
    {
      id: "ME002",
      nombre: "Enrox 50mg",
      categoria: "Antibióticos",
      precio: "$6.800",
      stock: "30"
    },
    {
      id: "ME003",
      nombre: "Metrobay 250mg",
      categoria: "Antibióticos",
      precio: "$3.900",
      stock: "28"
    },
    {
      id: "ME004",
      nombre: "Nexgard",
      categoria: "Antiparasitarios",
      precio: "$9.500",
      stock: "60"
    },
    {
      id: "ME005",
      nombre: "Bravecto",
      categoria: "Antiparasitarios",
      precio: "$18.900",
      stock: "40"
    },
    {
      id: "ME006",
      nombre: "Revolution Plus",
      categoria: "Antiparasitarios",
      precio: "$14.500",
      stock: "35"
    },
    {
      id: "ME007",
      nombre: "Drontal Plus",
      categoria: "Antiparasitarios",
      precio: "$3.200",
      stock: "80"
    },
    {
      id: "ME008",
      nombre: "Milbemax Gato",
      categoria: "Antiparasitarios",
      precio: "$6.800",
      stock: "50"
    },
    {
      id: "ME009",
      nombre: "Meloxicam 1mg",
      categoria: "Antiinflamatorios",
      precio: "$4.500",
      stock: "55"
    },
    {
      id: "ME010",
      nombre: "Carprofen 50mg",
      categoria: "Antiinflamatorios",
      precio: "$9.800",
      stock: "30"
    },
    {
      id: "ME011",
      nombre: "Clorhexidina shampoo",
      categoria: "Dermatología",
      precio: "$8.900",
      stock: "25"
    },
    {
      id: "ME012",
      nombre: "Malaseb shampoo",
      categoria: "Dermatología",
      precio: "$12.500",
      stock: "20"
    },
    {
      id: "ME013",
      nombre: "Apoquel 16mg",
      categoria: "Dermatología",
      precio: "$22.000",
      stock: "18"
    },
    {
      id: "ME014",
      nombre: "Probifor",
      categoria: "Digestivo",
      precio: "$5.600",
      stock: "40"
    },
    {
      id: "ME015",
      nombre: "Omeprazol 10mg vet",
      categoria: "Digestivo",
      precio: "$3.800",
      stock: "35"
    },
    {
      id: "ME016",
      nombre: "Vetmedin 2.5mg",
      categoria: "Cardíaco",
      precio: "$28.000",
      stock: "15"
    },
    {
      id: "ME017",
      nombre: "Tramadol 50mg vet",
      categoria: "Analgésicos",
      precio: "$5.200",
      stock: "22"
    },
    {
      id: "ME018",
      nombre: "Nobivac DHPPi",
      categoria: "Vacunas",
      precio: "$8.500",
      stock: "48"
    },
    {
      id: "ME019",
      nombre: "Nobivac Rabies",
      categoria: "Vacunas",
      precio: "$5.800",
      stock: "60"
    },
    {
      id: "ME020",
      nombre: "Felocell CVR",
      categoria: "Vacunas",
      precio: "$7.200",
      stock: "36"
    },
    {
      id: "ME021",
      nombre: "Omega vet 3-6-9",
      categoria: "Suplementos",
      precio: "$9.900",
      stock: "30"
    },
    {
      id: "ME022",
      nombre: "Condrovet forte",
      categoria: "Suplementos",
      precio: "$14.500",
      stock: "25"
    }
  ]);

  // Estados para los filtros de búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = [
    "Todas",
    "Consultas",
    "Cirugía",
    "Desparasitación",
    "Exámenes",
    "Otros",
    "Vacunación",
    "Antibióticos",
    "Antiparasitarios",
    "Antiinflamatorios",
    "Dermatología",
    "Digestivo",
    "Cardíaco",
    "Analgésicos",
    "Vacunas",
    "Suplementos"
  ];

  const agregarProducto = () => {
    navigate('/agregar');
  };

  // Elimina el producto del estado actual en pantalla
  const eliminarProducto = (id: string) => {
    const nuevaLista = inventario.filter((item) => item.id !== id);
    setInventario(nuevaLista);
  };

  // Filtra los productos según texto y categoría
  const productosFiltrados = inventario.filter((item) => {
    const coincideTexto = 
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = 
      categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  return (
    <div className="container mt-4 mb-5">
      {/* Barra de acciones del Administrador */}
      <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded" style={{ backgroundColor: 'rgb(61, 61, 61)' }}>
        <div>
          <button className="btn btn-success me-2" onClick={agregarProducto}>
            + Agregar Producto
          </button>
          <Link to="/ficha" className="btn btn-outline-light">
            Crear Ficha
          </Link>
        </div>
        <Link to="/admin" className="btn btn-secondary">
          Volver a Inicio Admin
        </Link>
      </div>

      <h2 style={{ fontWeight: 'bold' }}>Vista Catálogo (Inventario)</h2>
      <hr />

      {/* Buscador y Filtro por Categoría */}
      <div className="row mb-4 bg-white p-3 rounded shadow-sm">
        <div className="col-md-6 mb-2">
          <label className="form-label fw-bold">Buscar producto:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label fw-bold">Categoría:</label>
          <select
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenedor de los productos a modificar */}
      {productosFiltrados.length === 0 ? (
        <p className="text-center mt-4 fw-bold">No se encontraron productos.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4 mt-4 justify-content-center">
          {productosFiltrados.map((item) => (
            <div key={item.id} className="card shadow-sm" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title fw-bold">{item.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.categoria}</h6>
                <p className="card-text mb-1"><strong>Precio:</strong> {item.precio}</p>
                <p className="card-text mb-3"><strong>Stock:</strong> {item.stock}</p>
                
                <div className="d-flex justify-content-between">
                  <button 
                    className="btn btn-sm btn-primary w-100 me-2" 
                    onClick={() => {
                      localStorage.setItem("producto", JSON.stringify(item));
                      navigate(`/detalle-mod/${item.id}`);
                    }}
                  >
                    Modificar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger w-100" 
                    onClick={() => eliminarProducto(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}