import { Routes, Route } from 'react-router-dom'
import Navbar from './organism/Navbar'
import Footer from './organism/Footer' // Lo importamos de forma global
import PrincipalAdmin from './pages/PrincipalAdmin'
<Route path="/admin" element={<PrincipalAdmin />} />
import Modificaciones from './pages/Modificaciones'
<Route path="/modificaciones" element={<Modificaciones />} />

// Importacion las paginas
import Principal from './pages/Principal'

import Catalogo from './pages/Catalogo'
import Detalle from './pages/Detalle'
import DetalleMed from './pages/DetalleMed'
import Ficha from './pages/Ficha'
import MedVac from './pages/MedVac'
import Login from './pages/Login'
import Registro from './pages/Registro'

function App() {
  return (
    <div className="app-container">
      <Navbar />

      {/* Este contenedor empujará el footer hacia abajo */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Principal />} />
      
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/med-vac" element={<MedVac />} />

          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/detalle-med/:id" element={<DetalleMed />} />
          <Route path="/ficha/:id" element={<Ficha />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App