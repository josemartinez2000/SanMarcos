import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  API_MEDICAMENTOS,
  API_SERVICIOS,
  encabezados,
  obtenerMensajeError,
  formatearPrecio,
  type Medicamento,
  type Servicio
} from '../services/api';

interface ItemInventario {
  id: number;
  tipo: 'Servicio' | 'Medicamento';
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock?: number;
  duracion?: string;
}

export default function Modificaciones() {
  const navigate = useNavigate();

  const [inventario, setInventario] = useState<ItemInventario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState<string[]>([]);
  const [eliminando, setEliminando] = useState<string | null>(null);
  // Al incrementar este contador se vuelve a consultar el inventario
  const [recarga, setRecarga] = useState(0);

  // Estados para los filtros de búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Carga servicios (8083) y medicamentos (8082) desde MySQL
  useEffect(() => {
    const cargarInventario = async () => {
      const nuevosErrores: string[] = [];
      let servicios: ItemInventario[] = [];
      let medicamentos: ItemInventario[] = [];

      try {
        const respuesta = await fetch(API_SERVICIOS);
        if (!respuesta.ok) throw new Error();
        const datos: Servicio[] = await respuesta.json();
        servicios = datos.map((s) => ({
          id: s.id, tipo: 'Servicio', codigo: s.codigo, nombre: s.nombre,
          categoria: s.categoria, precio: s.precio, duracion: s.duracion
        }));
      } catch {
        nuevosErrores.push('No se pudieron cargar los servicios (servicios-service, puerto 8083).');
      }

      try {
        const respuesta = await fetch(API_MEDICAMENTOS);
        if (!respuesta.ok) throw new Error();
        const datos: Medicamento[] = await respuesta.json();
        medicamentos = datos.map((m) => ({
          id: m.id, tipo: 'Medicamento', codigo: m.codigo, nombre: m.nombre,
          categoria: m.categoria, precio: m.precio, stock: m.stock
        }));
      } catch {
        nuevosErrores.push('No se pudieron cargar los medicamentos (medicamentos-service, puerto 8082).');
      }

      setInventario([...servicios, ...medicamentos]);
      setErrores(nuevosErrores);
      setCargando(false);
    };
    cargarInventario();
  }, [recarga]);

  const agregarProducto = () => {
    navigate('/agregar');
  };

  // Elimina el registro en MySQL y refresca la lista
  const eliminarProducto = async (item: ItemInventario) => {
    const confirmado = window.confirm(`¿Seguro que desea eliminar "${item.nombre}" (${item.codigo})? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    const clave = `${item.tipo}-${item.id}`;
    setEliminando(clave);
    try {
      const url = item.tipo === 'Servicio' ? API_SERVICIOS : API_MEDICAMENTOS;
      const respuesta = await fetch(`${url}/${item.id}`, { method: 'DELETE', headers: encabezados() });
      if (!respuesta.ok) {
        alert(await obtenerMensajeError(respuesta, 'No se pudo eliminar. Intente nuevamente.'));
        return;
      }
      setRecarga((valor) => valor + 1);
    } catch {
      alert('No se pudo eliminar el producto. Intente nuevamente.');
    } finally {
      setEliminando(null);
    }
  };

  const modificarProducto = (item: ItemInventario) => {
    localStorage.setItem('producto', JSON.stringify(item));
    navigate(`/detalle-mod/${item.id}?tipo=${item.tipo === 'Servicio' ? 'servicio' : 'medicamento'}`);
  };

  // Categorías disponibles según el tipo elegido
  const categorias = ['Todas'];
  inventario
    .filter((item) => tipoSeleccionado === 'Todos' || item.tipo === tipoSeleccionado)
    .forEach((item) => {
      if (!categorias.includes(item.categoria)) {
        categorias.push(item.categoria);
      }
    });

  // Filtra los productos según texto, tipo y categoría
  const productosFiltrados = inventario.filter((item) => {
    const coincideTexto =
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = tipoSeleccionado === 'Todos' || item.tipo === tipoSeleccionado;
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;

    return coincideTexto && coincideTipo && coincideCategoria;
  });

  return (
    <div className="container mt-4 mb-5">
      {/* Barra de acciones del Administrador */}
      <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded flex-wrap gap-2" style={{ backgroundColor: 'rgb(61, 61, 61)' }}>
        <div>
          <button className="btn btn-success me-2" onClick={agregarProducto}>
            + Agregar Producto
          </button>
          <Link to="/ficha" className="btn btn-outline-light">
            Fichas Médicas
          </Link>
        </div>
        <Link to="/admin" className="btn btn-secondary">
          Volver a Inicio Admin
        </Link>
      </div>

      <h2 style={{ fontWeight: 'bold' }}>Vista Catálogo (Inventario)</h2>
      <hr />

      {errores.map((error) => (
        <div key={error} className="alert alert-danger py-2">{error}</div>
      ))}

      {/* Buscador y filtros por tipo y categoría */}
      <div className="row mb-4 bg-white p-3 rounded shadow-sm">
        <div className="col-md-4 mb-2">
          <label className="form-label fw-bold">Buscar producto:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o código..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label fw-bold">Gestionar:</label>
          <select
            className="form-select"
            value={tipoSeleccionado}
            onChange={(e) => {
              setTipoSeleccionado(e.target.value);
              setCategoriaSeleccionada('Todas');
            }}
          >
            <option value="Todos">Servicios y Medicamentos</option>
            <option value="Servicio">Solo Servicios</option>
            <option value="Medicamento">Solo Medicamentos</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
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
      {cargando ? (
        <div className="text-center my-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2">Cargando inventario...</p>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-center mt-4 fw-bold">No se encontraron productos.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4 mt-4 justify-content-center">
          {productosFiltrados.map((item) => {
            const clave = `${item.tipo}-${item.id}`;
            return (
              <div key={clave} className="card shadow-sm" style={{ width: '18rem' }}>
                <div className="card-body">
                  <span className={`badge mb-2 ${item.tipo === 'Servicio' ? 'bg-success' : 'bg-primary'}`}>
                    {item.tipo}
                  </span>
                  <h5 className="card-title fw-bold">{item.nombre}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.codigo} · {item.categoria}</h6>
                  <p className="card-text mb-1"><strong>Precio:</strong> {formatearPrecio(item.precio)}</p>
                  {item.tipo === 'Medicamento' ? (
                    <p className="card-text mb-3"><strong>Stock:</strong> {item.stock}</p>
                  ) : (
                    <p className="card-text mb-3"><strong>Duración:</strong> {item.duracion}</p>
                  )}

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary w-100 me-2"
                      onClick={() => modificarProducto(item)}
                    >
                      Modificar
                    </button>
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => eliminarProducto(item)}
                      disabled={eliminando === clave}
                    >
                      {eliminando === clave ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
