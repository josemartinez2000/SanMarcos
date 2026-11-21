import { useEffect, useState } from 'react';
import GrillaCatalogo, { type ItemCatalogo } from '../organism/GrillaCatalogo';
import { API_MEDICAMENTOS, formatearPrecio, type Medicamento } from '../services/api';

function MedVac() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Se consulta el inventario de farmacia a medicamentos-service al cargar la página
  useEffect(() => {
    const cargarMedicamentos = async () => {
      try {
        const respuesta = await fetch(API_MEDICAMENTOS);
        if (!respuesta.ok) {
          throw new Error('Error al consultar medicamentos');
        }
        setMedicamentos(await respuesta.json());
      } catch {
        setError('No se pudieron cargar los medicamentos. Verifique que medicamentos-service (puerto 8082) esté activo.');
      } finally {
        setCargando(false);
      }
    };
    cargarMedicamentos();
  }, []);

  const items: ItemCatalogo[] = medicamentos.map((medicamento) => ({
    id: String(medicamento.id),
    codigo: medicamento.codigo,
    nombre: medicamento.nombre,
    categoria: medicamento.categoria,
    precio: formatearPrecio(medicamento.precio),
    imagen: medicamento.imagen,
    detalles: `Stock disponible: ${medicamento.stock}`
  }));

  return (
    <>
      <header className="catalogo-header container-fluid px-4 mt-4">
        <h1>Medicamentos y Vacunas</h1>
        <p>Productos farmacéuticos y vacunas disponibles en nuestra clínica</p>
      </header>

      {cargando && (
        <div className="container text-center my-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2">Cargando medicamentos...</p>
        </div>
      )}

      {error !== '' && (
        <div className="container my-4">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      )}

      {!cargando && error === '' && (
        <GrillaCatalogo items={items} rutaBase="/detalle-med" />
      )}
    </>
  );
}

export default MedVac;
