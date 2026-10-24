import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function AgregarProducto() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipo, setTipo] = useState('Servicio');
  const [detalles, setDetalles] = useState('');

  const guardarProducto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (id === '' || nombre === '' || precio === '') {
      alert("Por favor, complete al menos el ID, Nombre y Precio.");
      return;
    }

    const nuevoProducto = {
      id,
      nombre,
      categoria,
      tipo,
      precio,
      detalles
    };

    localStorage.setItem("nuevoProducto", JSON.stringify(nuevoProducto));
    alert(`¡Producto "${nombre}" agregado exitosamente al catálogo!`);
    navigate('/modificaciones');
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <section className="tarjeta-opcion shadow" style={{ width: '60%', backgroundColor: '#223526', color: 'white', borderRadius: '10px', padding: '40px' }}>
        <h3 style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>Agregar Nuevo Producto / Servicio</h3>
        <form>
          <CampoFormulario label="ID (Ej: SV006):" tipo="text" valor={id} onChange={(e) => setId(e.target.value)} />
          <CampoFormulario label="Nombre:" tipo="text" valor={nombre} onChange={(e) => setNombre(e.target.value)} />
          <CampoFormulario label="Categoría (Ej: Consultas, Vacunación):" tipo="text" valor={categoria} onChange={(e) => setCategoria(e.target.value)} />
          
          <div style={{ marginBottom: '15px' }}>
            <label>Tipo:</label><br />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', padding: '5px' }}>
              <option value="Servicio">Servicio</option>
              <option value="Medicamento">Medicamento</option>
            </select>
          </div>

          <CampoFormulario label="Precio (Ej: $15.000):" tipo="text" valor={precio} onChange={(e) => setPrecio(e.target.value)} />
          <CampoFormulario label="Detalles / Stock:" tipo="text" valor={detalles} onChange={(e) => setDetalles(e.target.value)} />
          
          <div className="d-flex gap-3 mt-4">
            <Boton texto="Guardar Producto" onClick={guardarProducto} />
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