import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">Veterinaria San Marcos</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            
            <li className="nav-item">
              <a className="nav-link" href="/#nosotros">Nosotros</a>
            </li>

            <li className="nav-item">
              <a href="/#noticias" className="nav-link">Noticias</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/#servicios">Servicios</a>
            </li>
            

            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesion</Link>
            </li>

            <li className="nav-item">
              <Link className="boton-cuenta" to="/registro">Crear Cuenta</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}