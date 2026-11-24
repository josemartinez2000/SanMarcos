import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { API_MEDICAMENTOS, API_SERVICIOS, encabezados, obtenerMensajeError } from '../services/api';

export default function AgregarProducto() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('Servicio');
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [duracion, setDuracion] = useState('');
  const [imagen, setImagen] = useState('/img/');
  const [detalles, setDetalles] = useState('');
  const [enviando, setEnviando] = useState(false);

  const guardarProducto = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (enviando) return;

    if (codigo.trim() === '' || nombre.trim() === '' || precio === '') {
      alert("Por favor, complete al menos el Código, Nombre y Precio.");
      return;
    }

    if (categoria.trim() === '') {
      alert('Debe indicar la categoría.');
      return;
    }

    const precioNumero = Number(precio);
    if (!Number.isInteger(precioNumero) || precioNumero < 0) {
      alert('El precio debe ser un número entero mayor o igual a 0 (sin puntos ni signo $).');
      return;
    }

    if (tipo === 'Medicamento' && (!Number.isInteger(Number(stock)) || stock === '' || Number(stock) < 0)) {
      alert('El stock debe ser un número entero mayor o igual a 0.');
      return;
    }

    if (tipo === 'Servicio' && duracion.trim() === '') {
      alert('Debe indicar la duración del servicio (Ej: 30 min).');
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

    const nuevoProducto = tipo === 'Servicio'
      ? { ...datosBase, duracion: duracion.trim() }
      : { ...datosBase, stock: Number(stock) };

    setEnviando(true);
    try {
      const respuesta = await fetch(tipo === 'Servicio' ? API_SERVICIOS : API_MEDICAMENTOS, {
        method: 'POST',
        headers: encabezados(true),
        body: JSON.stringify(nuevoProducto)
      });

      if (!respuesta.ok) {
        alert(await obtenerMensajeError(respuesta, 'No se pudo guardar el producto. Revise los datos ingresados.'));
        return;
      }

      alert(`¡Producto "${nombre}" agregado exitosamente al catálogo!`);
      navigate('/modificaciones');
    } catch {
      alert('No se pudo conectar con el servidor. Verifique que el microservicio esté activo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <section className="tarjeta-opcion shadow" style={{ width: '60%', minWidth: '320px', backgroundColor: '#223526', color: 'white', borderRadius: '10px', padding: '40px' }}>
        <h3 style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>Agregar Nuevo Producto / Servicio</h3>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label>Tipo:</label><br />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', padding: '5px' }}>
              <option value="Servicio">Servicio</option>
              <option value="Medicamento">Medicamento</option>
            </select>
          </div>

          <CampoFormulario label={tipo === 'Servicio' ? 'Código (Ej: SV026):' : 'Código (Ej: ME029):'} tipo="text" valor={codigo} onChange={(e) => setCodigo(e.target.value)} />
          <CampoFormulario label="Nombre:" tipo="text" valor={nombre} onChange={(e) => setNombre(e.target.value)} />
          <CampoFormulario label="Categoría (Ej: Consultas, Vacunación):" tipo="text" valor={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <CampoFormulario label="Precio en pesos (Ej: 15000):" tipo="number" valor={precio} onChange={(e) => setPrecio(e.target.value)} />

          {tipo === 'Medicamento' ? (
            <CampoFormulario label="Stock:" tipo="number" valor={stock} onChange={(e) => setStock(e.target.value)} />
          ) : (
            <CampoFormulario label="Duración (Ej: 30 min):" tipo="text" valor={duracion} onChange={(e) => setDuracion(e.target.value)} />
          )}

          <CampoFormulario label="Imagen (ruta en /public, Ej: /img/Consulta general.jpg):" tipo="text" valor={imagen} onChange={(e) => setImagen(e.target.value)} />

          <div style={{ marginBottom: '15px' }}>
            <label>Detalles:</label><br />
            <textarea
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              rows={3}
              style={{ width: '100%' }}
            />
          </div>

          <div className="d-flex gap-3 mt-4">
            <Boton texto={enviando ? 'Guardando...' : 'Guardar Producto'} onClick={guardarProducto} disabled={enviando} />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/modificaciones')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
