import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_CLIENTES, type Cliente } from '../services/api';

export default function PrincipalAdmin() {
  const [usuarios, setUsuarios] = useState<Cliente[]>([]);
  const [error, setError] = useState('');

  // Lista de usuarios registrados en clientes-service
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch(API_CLIENTES);
        if (!respuesta.ok) throw new Error();
        setUsuarios(await respuesta.json());
      } catch {
        setError('No se pudo cargar la lista de usuarios (clientes-service, puerto 8081).');
      }
    };
    cargarUsuarios();
  }, []);

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
              Aquí puedes agregar, editar y eliminar los servicios clínicos y los medicamentos
              del catálogo, con los datos guardados en la base de datos.
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

        <Link to="/ficha" className="linkeado text-decoration-none text-dark">
          <section className="contenedor p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa', maxWidth: '300px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Fichas</h3>
            <p>
              Aquí tendrás acceso a las fichas médicas de los pacientes, podrás analizarlos y modificarlos.
            </p>
          </section>
        </Link>
      </div>

      <br /><br />

      <div className="contenedor mt-5 p-4 shadow-sm rounded bg-white">
        <h2 style={{ fontWeight: 'bold' }}>Lista de Usuarios</h2>
        <hr />
        {error !== '' && <div className="alert alert-danger py-2">{error}</div>}
        <table className="table table-striped table-hover mt-3" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombreCompleto}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono || '-'}</td>
                <td>{usuario.rol === 'ADMIN' ? 'Administrador' : 'Cliente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
