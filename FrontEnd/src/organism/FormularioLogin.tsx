import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { API_CLIENTES, obtenerMensajeError, type LoginResponse } from '../services/api';

export default function FormularioLogin() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const iniciarSesion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (enviando) return;

    // 1. Validar campos vacíos
    if (correo.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // 2. Validar formato de correo básico
    if (!correo.includes('@') || !correo.includes('.')) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // 3. Validar longitud mínima de contraseña
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    setError('');
    setEnviando(true);

    try {
      // 4. Validar las credenciales contra clientes-service (MySQL)
      const respuesta = await fetch(`${API_CLIENTES}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correo.trim(), password })
      });

      if (!respuesta.ok) {
        setError(await obtenerMensajeError(respuesta, 'Correo o contraseña incorrectos.'));
        return;
      }

      const { token, usuario }: LoginResponse = await respuesta.json();

      // 5. Se guarda el token y la sesión en localStorage (hasta cerrar sesión o que el token expire)
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('usuarioLogueado', usuario.correo);
      localStorage.setItem('rolUsuario', usuario.rol);

      // 6. Se redirige según el rol
      if (usuario.rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch {
      setError('No se pudo conectar con el servidor. Verifique que clientes-service esté activo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="p-4 rounded shadow"
        style={{ backgroundColor: '#223526', color: '#F5F1E6', maxWidth: '450px', width: '100%' }}
      >
        <h2 className="text-center fw-bold mb-4">Iniciar Sesión</h2>

        {error !== '' && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        <form>
          <CampoFormulario
            label="Correo Electrónico:"
            tipo="email"
            valor={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <CampoFormulario
            label="Contraseña:"
            tipo="password"
            valor={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-grid gap-2 mt-4">
            <Boton texto={enviando ? 'Ingresando...' : 'Ingresar'} onClick={iniciarSesion} disabled={enviando} />
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta?{' '}
            <Link to="/registro" style={{ color: '#A8C6B0', fontWeight: 'bold' }}>
              Regístrate aquí
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
