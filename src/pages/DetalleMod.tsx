import { useLocation, useNavigate } from 'react-router-dom';

export default function DetalleMod() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const producto = location.state?.producto;

  // Si alguien entra a esta página directamente sin seleccionar un producto, mostramos un mensaje
  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-4">No se encontró el producto.</h2>
        <p>Por favor, vuelve al inventario y selecciona un servicio o medicamento.</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/modificaciones')}>
          Volver al Inventario
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Detalle del Servicio / Producto</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="caja-info text-center shadow-sm" style={{ backgroundColor: '#ffffff' }}>
            
            
            <img 
              src={producto.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
              alt={producto.nombre} 
              className="img-fluid rounded mb-3" 
              style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }} 
            />
            
            <h2 className="mb-2 fw-bold">{producto.nombre}</h2>
            <p className="fs-4 fw-bold mb-2 text-success">Precio: {producto.precio}</p>
            
            {/* Como juntamos el stock y la categoría en el paso anterior, los mostramos aquí */}
            <p className="text-muted mb-1">Categoría: {producto.categoria}</p>
            <p className="text-muted mb-4">Stock disponible: {producto.stock}</p>
            
            <div className="d-flex justify-content-center gap-3">
              <button 
                className="btn btn-primary px-4" 
                onClick={() => alert('No hay base de datos conectada para editar aún.')}
              >
                Editar
              </button>
              <button 
                className="btn btn-secondary px-4" 
                onClick={() => navigate('/modificaciones')}
              >
                Volver
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}