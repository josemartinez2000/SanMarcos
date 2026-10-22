import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioLogin() {
  // useState reemplaza a document.getElementById().value
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  
  // useNavigate reemplaza a window.location.href
  const navigate = useNavigate();

  const ingreso = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita que la página se recargue

    let formatoadmin = /^[^\s@]+@+sanmarcosadmin\.[^\s@]+$/;
    let formatocliente = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (clave === "" || correo === "") {
      alert("Complete todos los campos");
      return;
    }

    if (formatoadmin.test(correo)) {
      alert("Sesión iniciada como Administrador");
     
    } else if (formatocliente.test(correo)) {
      navigate('/'); // Redirige a la página principal
    } else {
      alert("Correo invalido");
    }
  };

  return (
    <section className="tarjeta-opcion" style={{ width: '50%', backgroundColor: '#223526', margin: 'auto', padding: '40px', color: 'white', borderRadius: '10px' }}>
      <div style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 style={{ color: 'white' }}>Inicie Sesión</h3>
        <br />
        <form>
          <CampoFormulario 
            label="Correo:" 
            tipo="email" 
            valor={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
          />
          <CampoFormulario 
            label="Contraseña:" 
            tipo="password" 
            valor={clave} 
            onChange={(e) => setClave(e.target.value)} 
          />
          <Boton texto="Ingresar" onClick={ingreso} />
        </form>
      </div>
    </section>
  );
}