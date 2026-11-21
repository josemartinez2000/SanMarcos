import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  API_MEDICAMENTOS,
  API_SERVICIOS,
  formatearPrecio,
  obtenerMensajeError,
  type Medicamento,
  type Servicio
} from '../services/api';

export default function DetalleMod() {
  const { id } = useParams();
  const [parametros] = useSearchParams();
  const navigate = useNavigate();

  // El tipo llega en la URL: /detalle-mod/5?tipo=medicamento
  const esMedicamento = parametros.get('tipo') === 'medicamento';
  const urlBase = esMedicamento ? API_MEDICAMENTOS : API_SERVICIOS;

  const [cargando, setCargando] = useState(true);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

  // Campos editables del formulario
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [duracion, setDuracion] = useState('');
  const [imagen, setImagen] = useState('');
  const [detalles, setDetalles] = useState('');

  // Carga el registro actual desde MySQL
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(`${urlBase}/${id}`);
        if (!respuesta.ok) {
          setNoEncontrado(true);
          return;
        }
        const producto: Servicio & Medicamento = await respuesta.json();
        setCodigo(producto.codigo);
        setNombre(producto.nombre);
        setCategoria(producto.categoria);
        setPrecio(String(producto.precio));
        setStock(producto.stock !== undefined ? String(producto.stock) : '');
        setDuracion(producto.duracion ?? '');
        setImagen(producto.imagen ?? '');
        setDetalles(producto.detalles ?? '');
      } catch {
        setNoEncontrado(true);
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id, urlBase]);

  const guardarCambios = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando) return;

    const precioNumero = Number(precio);
    if (codigo.trim() === '' || nombre.trim() === '' || categoria.trim() === '' || precio === '') {
      setMensaje({ tipo: 'danger', texto: 'Código, nombre, categoría y precio son obligatorios.' });
      return;
    }
    if (!Number.isInteger(precioNumero) || precioNumero < 0) {
      setMensaje({ tipo: 'danger', texto: 'El precio debe ser un número entero mayor o igual a 0.' });
      return;
    }
    if (esMedicamento && (stock === '' || !Number.isInteger(Number(stock)) || Number(stock) < 0)) {
      setMensaje({ tipo: 'danger', texto: 'El stock debe ser un número entero mayor o igual a 0.' });
      return;
    }
    if (!esMedicamento && duracion.trim() === '') {
      setMensaje({ tipo: 'danger', texto: 'La duración del servicio es obligatoria.' });
      return;
    }

    const datosBase = {
      codigo: codigo.trim().toUpperCase(),
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: precioNumero,
      imagen: imagen.trim(),
      detalles: detalles.trim()
    };
    const datos = esMedicamento
      ? { ...datosBase, stock: Number(stock) }
      : { ...datosBase, duracion: duracion.trim() };

    setEnviando(true);
    setMensaje(null);
    try {
      const respuesta = await fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudieron guardar los cambios.') });
        return;
      }
      setMensaje({ tipo: 'success', texto: 'Cambios guardados correctamente en la base de datos.' });
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo conectar con el servidor.' });
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (noEncontrado) {
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
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
        Editar {esMedicamento ? 'Medicamento' : 'Servicio'}
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="caja-info shadow-sm" style={{ backgroundColor: '#ffffff' }}>

            <div className="text-center">
              {imagen && (
                <img
                  src={imagen}
                  alt={nombre}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: '220px', objectFit: 'contain' }}
                />
              )}
              <h2 className="mb-1 fw-bold">{nombre}</h2>
              <p className="fs-5 fw-bold mb-3 text-success">
                Precio actual: {precio !== '' && !Number.isNaN(Number(precio)) ? formatearPrecio(Number(precio)) : '-'}
              </p>
            </div>

            {mensaje && (
              <div className={`alert alert-${mensaje.tipo} py-2`}>{mensaje.texto}</div>
            )}

            <form onSubmit={guardarCambios}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Código</label>
                  <input className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label fw-bold">Nombre</label>
                  <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <input className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Precio (CLP)</label>
                  <input type="number" min="0" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>
              </div>

              <div className="mb-3">
                {esMedicamento ? (
                  <>
                    <label className="form-label fw-bold">Stock disponible</label>
                    <input type="number" min="0" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                  </>
                ) : (
                  <>
                    <label className="form-label fw-bold">Duración</label>
                    <input className="form-control" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
                  </>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Imagen (ruta)</label>
                <input className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Detalles</label>
                <textarea className="form-control" rows={3} value={detalles} onChange={(e) => setDetalles(e.target.value)} />
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-primary px-4" disabled={enviando}>
                  {enviando ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => navigate('/modificaciones')}
                >
                  Volver
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
