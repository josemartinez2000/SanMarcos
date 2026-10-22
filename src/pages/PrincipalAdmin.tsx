import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function PrincipalAdmin() {
  
  const [usuarios] = useState([
    { id: 1, nombre: 'juan.perez@email.com', rol: 'Cliente' },
    { id: 2, nombre: 'admin@sanmarcosadmin.cl', rol: 'Administrador' },
    { id: 3, nombre: 'maria.silva@email.com', rol: 'Cliente' }
  ]);

  const opcionNoDisponible = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('Opción no disponible temporalmente');
  };

  return (
    <div className="container mt-4 mb-5">
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        <h1 style={{ fontWeight: 'bolder' }}>Administración</h1>
        <br />
        <p>Ha iniciado sesión en una cuenta de administrador.</p>
        <p>Bajo este párrafo podrá encontrar las opciones y vistas de administración que necesite.</p>
      </div>
      
      <br /><br />
      
      {/* Tarjetas de Opciones */}
      <div className="contenedores d-flex gap-4 flex-wrap justify-content-center">
        <Link to="/modificaciones" className="linkeado text-decoration-none text-dark">
          <section className="contenedor p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa', maxWidth: '300px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Inventario</h3>
            <p>
              Aquí puedes observar un detalle resumido del stock disponible en el inventario, 
              puedes usar sus datos para añadir cualquier producto al catálogo.
            </p>
          </section>
        </Link>

        <a href="#" className="linkeado text-decoration-none text-dark" onClick={opcionNoDisponible}>
          <section className="contenedor p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa', maxWidth: '300px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Balance</h3>
            <p>
              Aquí encontrarás un resumen de los últimos pagos hechos por los clientes.
            </p>
          </section>
        </a>

        <a href="#" className="linkeado text-decoration-none text-dark" onClick={opcionNoDisponible}>
          <section className="contenedor p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa', maxWidth: '300px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Fichas</h3>
            <p>
              Aquí tendrás acceso a las fichas médicas de los pacientes, podrás analizarlos y modificarlos.
            </p>
          </section>
        </a>
      </div>

      <br /><br />

   
      <div className="contenedor mt-5 p-4 shadow-sm rounded bg-white">
        <h2 style={{ fontWeight: 'bold' }}>Lista de Usuarios</h2>
        <hr />
        <table className="table table-striped table-hover mt-3" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className="table-dark">
            <tr>
              <th>Nombre (Correo)</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}