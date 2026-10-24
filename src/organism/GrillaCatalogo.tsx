import { useState } from 'react';
import CardMedicamento from '../molecules/CardMedicamento';

interface ItemCatalogo {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
  detalles?: string;
}

interface Props {
  items: ItemCatalogo[];
  rutaBase?: string;
}

export default function GrillaCatalogo({ items = [], rutaBase = '/detalle' }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = ['Todas'];
  items.forEach((item) => {
    if (!categorias.includes(item.categoria)) {
      categorias.push(item.categoria);
    }
  });

  const itemsFiltrados = items.filter((item) => {
    const coincideTexto =
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;
    return coincideTexto && coincideCategoria;
  });

  return (
    <div className="container-fluid px-4 my-4">
      <div className="row g-4">
        
        {/* COLUMNA IZQUIERDA: Filtros laterales */}
        <div className="col-12 col-md-3 col-lg-2">
          <div
            className="p-3 rounded shadow-sm"
            style={{ backgroundColor: '#223526', color: '#F5F1E6' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold" style={{ fontSize: '0.9rem', color: '#A8C6B0' }}>
                {itemsFiltrados.length} resultados
              </span>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                style={{ fontSize: '0.75rem', color: '#F5F1E6' }}
                onClick={() => {
                  setBusqueda('');
                  setCategoriaSeleccionada('Todas');
                }}
              >
                BORRAR FILTROS
              </button>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>
                Palabras clave
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>
                Categorías
              </label>
              <select
                className="form-select form-select-sm"
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
        </div>

        {/* COLUMNA DERECHA: Grilla de tarjetas */}
        <div className="col-12 col-md-9 col-lg-10">
          {itemsFiltrados.length === 0 ? (
            <div className="alert alert-warning text-center">
              No se encontraron resultados para tu búsqueda.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '20px'
              }}
            >
              {itemsFiltrados.map((producto) => (
                <CardMedicamento
                  key={producto.id}
                  id={producto.id}
                  nombre={producto.nombre}
                  categoria={producto.categoria}
                  precio={producto.precio}
                  imagen={producto.imagen}
                  detalles={producto.detalles}
                  rutaBase={rutaBase}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}