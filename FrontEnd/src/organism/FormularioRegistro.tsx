import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { API_CLIENTES, obtenerMensajeError } from '../services/api';

export default function FormularioRegistro() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  const registro = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (enviando) return;

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombreCompleto.trim() === '' || correo.trim() === '' || clave === '' || clave2 === '') {
      setError('Complete todos los campos obligatorios.');
      return;
    }

    if (!formatoCorreo.test(correo.trim())) {
      setError('Correo inválido.');
      return;
    }

    if (clave.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (clave !== clave2) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setEnviando(true);

    try {
      const respuesta = await fetch(`${API_CLIENTES}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompleto: nombreCompleto.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          password: clave
        })
      });

      if (!respuesta.ok) {
        setError(await obtenerMensajeError(respuesta, 'No se pudo crear la cuenta. Revise los datos ingresados.'));
        return;
      }

      alert('Cuenta creada con éxito. Ahora puede iniciar sesión.');
      navigate('/login');
    } catch {
      setError('No se pudo conectar con el servidor. Verifique que clientes-service esté activo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="tarjeta-opcion" style={{ width: '50%', minWidth: '320px', backgroundColor: '#223526', margin: 'auto', padding: '40px', color: 'white', borderRadius: '10px' }}>
      <div style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 style={{ color: 'white' }}>Registrar usuario</h3>
        <br />

        {error !== '' && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        <form>
          <CampoFormulario
            label="Nombre completo:"
            tipo="text"
            valor={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
          />
          <CampoFormulario
            label="Correo:"
            tipo="email"
            valor={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <CampoFormulario
            label="Teléfono (opcional):"
            tipo="tel"
            valor={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
          <Boton texto={enviando ? 'Registrando...' : 'Registrar'} onClick={registro} disabled={enviando} />
        </form>

        <div className="mt-3">
          <small>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: '#A8C6B0', fontWeight: 'bold' }}>
              Inicia sesión
            </Link>
          </small>
        </div>
      </div>
    </section>
  );
}
