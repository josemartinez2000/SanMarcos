import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioLogin() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const iniciarSesion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

    // 4. Determinar si es Admin o Cliente según el correo
    const correoLimpio = correo.trim().toLowerCase();
    const esAdmin = correoLimpio.includes('@sanmarcos.cl') || correoLimpio.includes('admin');

    // Se guarda la sesión en localStorage (se mantiene hasta cerrar sesión manualmente)
    localStorage.setItem('usuarioLogueado', correo.trim());
    localStorage.setItem('rolUsuario', esAdmin ? 'admin' : 'cliente');

    // Se redirige según el rol
    if (esAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
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
            <Boton texto="Ingresar" onClick={iniciarSesion} />
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