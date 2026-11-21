import { Link, useNavigate, useLocation } from 'react-router-dom';
import { obtenerSesion, cerrarSesionGuardada } from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();

  // useLocation hace que la barra se vuelva a dibujar en cada cambio de página,
  // así la sesión guardada en localStorage (login contra clientes-service) siempre está al día
  useLocation();
  const { correo: usuario, rol } = obtenerSesion();

  const cerrarSesion = () => {
    cerrarSesionGuardada();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Veterinaria San Marcos
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 flex-wrap justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/med-vac">Medicamentos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/noticias">Noticias</Link>
            </li>

            {/*  Pestaña especial que SOLO aparece si es Administrador */}
            {rol === 'ADMIN' && (
              <li className="nav-item">
                <Link 
                  className="btn btn-warning fw-bold text-dark px-3" 
                  to="/admin"
                >
                  Panel Admin
                </Link>
              </li>
            )}

            {/*  Detectar sesión activa y mantenerla hasta cerrar manualmente */}
            {usuario ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ficha">
                    {rol === 'ADMIN' ? 'Fichas' : 'Mis Fichas'}
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link fw-bold" style={{ color: '#A8C6B0' }}>
                    Hola, {usuario}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={cerrarSesion} 
                    className="btn btn-outline-light btn-sm ms-lg-2"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="boton-cuenta" to="/registro">Crear Cuenta</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}