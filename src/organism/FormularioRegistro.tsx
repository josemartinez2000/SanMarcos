import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioRegistro() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');
  
  const navigate = useNavigate();

  const registro = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let formatocliente = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (clave === "" || correo === "" || clave2 === "") {
      alert("Complete todos los campos");
      return;
    }

    if (formatocliente.test(correo)) {
      if (clave !== clave2) {
        alert("Contraseñas no coinciden");
        return;
      } else {
        alert("Cuenta creada con éxito");
        navigate('/'); // Redirige a la página principal
      }
    } else {
      alert("Correo invalido");
      return;
    }
  };

  return (
    <section className="tarjeta-opcion" style={{ width: '50%', backgroundColor: '#223526', margin: 'auto', padding: '40px', color: 'white', borderRadius: '10px' }}>
      <div style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 style={{ color: 'white' }}>Registrar usuario</h3>
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
          <CampoFormulario 
            label="Confirmar contraseña:" 
            tipo="password" 
            valor={clave2} 
            onChange={(e) => setClave2(e.target.value)} 
          />
          <Boton texto="Registrar" onClick={registro} />
        </form>
      </div>
    </section>
  );
}