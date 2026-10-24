import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './organism/Navbar';
import Footer from './organism/Footer';

// Vistas Públicas
import Principal from './pages/Principal';
import Noticias from './pages/Noticias';
import Catalogo from './pages/Catalogo';
import MedVac from './pages/MedVac';
import Detalle from './pages/Detalle';
import DetalleMed from './pages/DetalleMed';
import Login from './pages/Login';
import Registro from './pages/Registro';


// Vistas de Administración y Fichas
import PrincipalAdmin from './pages/PrincipalAdmin';
import Modificaciones from './pages/Modificaciones';
import AgregarProducto from './pages/AgregarProducto';
import DetalleMod from './pages/DetalleMod';
import Ficha from './pages/Ficha';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Barra de navegación global */}
        <Navbar />

        {/* Contenido dinámico según la ruta */}
        <main className="main-content">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Principal />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/med-vac" element={<MedVac />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/detalle-med/:id" element={<DetalleMed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Rutas de Administración */}
            <Route path="/admin" element={<PrincipalAdmin />} />
            <Route path="/modificaciones" element={<Modificaciones />} />
            <Route path="/agregar" element={<AgregarProducto />} />
            <Route path="/detalle-mod/:id" element={<DetalleMod />} />
            
            {/* Rutas de Ficha (con o sin parámetro ID) */}
            <Route path="/ficha" element={<Ficha />} />
            <Route path="/ficha/:id" element={<Ficha />} />
          </Routes>
        </main>

        {/* Pie de página global */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}