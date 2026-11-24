import { useEffect, useState } from 'react';
import HistorialMascotas from './HistorialMascotas';
import {
  API_CLIENTES,
  API_FICHAS,
  API_MASCOTAS,
  encabezados,
  obtenerMensajeError,
  type Cliente,
  type FichaMedica,
  type Mascota
} from '../services/api';

interface Props {
  // Nombre del servicio o producto desde el que se llegó ("Agregar a ficha")
  motivoInicial?: string;
}

// Fecha local de hoy en formato yyyy-mm-dd para los input de tipo date
function fechaHoy(): string {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

type Mensaje = { tipo: 'success' | 'danger'; texto: string } | null;

// Panel del administrador: registrar mascotas y crear, editar o eliminar fichas médicas
export default function GestionFichas({ motivoInicial = '' }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [correoCliente, setCorreoCliente] = useState('');
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [fichas, setFichas] = useState<FichaMedica[]>([]);
  const [mensaje, setMensaje] = useState<Mensaje>(null);

  // Formulario de mascota
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [enviandoMascota, setEnviandoMascota] = useState(false);

  // Formulario de ficha médica (si fichaEditando tiene id se actualiza con PUT)
  const [fichaEditando, setFichaEditando] = useState<number | null>(null);
  const [mascotaId, setMascotaId] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState(motivoInicial);
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [estado, setEstado] = useState<'EN_ATENCION' | 'ALTA'>('EN_ATENCION');
  const [fechaAtencion, setFechaAtencion] = useState(fechaHoy());
  const [enviandoFicha, setEnviandoFicha] = useState(false);

  // Clientes registrados en clientes-service para el selector
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const respuesta = await fetch(API_CLIENTES, { headers: encabezados() });
        if (!respuesta.ok) {
          setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo cargar la lista de clientes.') });
          return;
        }
        const datos: Cliente[] = await respuesta.json();
        setClientes(datos.filter((cliente) => cliente.rol === 'CLIENTE'));
      } catch {
        setMensaje({ tipo: 'danger', texto: 'No se pudo cargar la lista de clientes (clientes-service, puerto 8081).' });
      }
    };
    cargarClientes();
  }, []);

  // Mascotas y fichas del cliente seleccionado (fichas-service)
  const cargarDatosCliente = async (correo: string) => {
    if (correo === '') {
      setMascotas([]);
      setFichas([]);
      return;
    }
    try {
      const correoUrl = encodeURIComponent(correo);
      const [respuestaMascotas, respuestaFichas] = await Promise.all([
        fetch(`${API_MASCOTAS}/cliente/${correoUrl}`, { headers: encabezados() }),
        fetch(`${API_FICHAS}/cliente/${correoUrl}`, { headers: encabezados() })
      ]);
      const fallida = !respuestaMascotas.ok ? respuestaMascotas : !respuestaFichas.ok ? respuestaFichas : null;
      if (fallida) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(fallida, 'No se pudieron cargar las fichas.') });
        return;
      }
      setMascotas(await respuestaMascotas.json());
      setFichas(await respuestaFichas.json());
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudieron cargar las fichas (fichas-service, puerto 8084).' });
    }
  };

  const seleccionarCliente = (correo: string) => {
    setCorreoCliente(correo);
    setMascotaId('');
    // Se conserva el motivo precargado; solo se descarta una edición en curso
    if (fichaEditando) limpiarFormularioFicha();
    setMensaje(null);
    cargarDatosCliente(correo);
  };

  const limpiarFormularioFicha = () => {
    setFichaEditando(null);
    setMotivoConsulta('');
    setDiagnostico('');
    setTratamiento('');
    setVeterinario('');
    setEstado('EN_ATENCION');
    setFechaAtencion(fechaHoy());
  };

  const registrarMascota = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviandoMascota) return;
    if (correoCliente === '') {
      setMensaje({ tipo: 'danger', texto: 'Seleccione primero un cliente.' });
      return;
    }
    if (nombreMascota.trim() === '' || especie.trim() === '') {
      setMensaje({ tipo: 'danger', texto: 'El nombre y la especie de la mascota son obligatorios.' });
      return;
    }

    setEnviandoMascota(true);
    try {
      const respuesta = await fetch(API_MASCOTAS, {
        method: 'POST',
        headers: encabezados(true),
        body: JSON.stringify({
          correoCliente,
          nombre: nombreMascota.trim(),
          especie: especie.trim(),
          raza: raza.trim(),
          edad: edad === '' ? null : Number(edad)
        })
      });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo registrar la mascota.') });
        return;
      }
      const nueva: Mascota = await respuesta.json();
      setNombreMascota('');
      setEspecie('');
      setRaza('');
      setEdad('');
      setMascotaId(String(nueva.id));
      setMensaje({ tipo: 'success', texto: `Mascota "${nueva.nombre}" registrada correctamente.` });
      await cargarDatosCliente(correoCliente);
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo conectar con fichas-service.' });
    } finally {
      setEnviandoMascota(false);
    }
  };

  const guardarFicha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviandoFicha) return;
    if (mascotaId === '' || motivoConsulta.trim() === '' || veterinario.trim() === '' || fechaAtencion === '') {
      setMensaje({ tipo: 'danger', texto: 'Mascota, motivo de consulta, veterinario y fecha son obligatorios.' });
      return;
    }

    const datos = {
      mascota: { id: Number(mascotaId) },
      motivoConsulta: motivoConsulta.trim(),
      diagnostico: diagnostico.trim(),
      tratamiento: tratamiento.trim(),
      veterinario: veterinario.trim(),
      estado,
      fechaAtencion
    };

    setEnviandoFicha(true);
    try {
      const url = fichaEditando ? `${API_FICHAS}/${fichaEditando}` : API_FICHAS;
      const respuesta = await fetch(url, {
        method: fichaEditando ? 'PUT' : 'POST',
        headers: encabezados(true),
        body: JSON.stringify(datos)
      });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo guardar la ficha médica.') });
        return;
      }
      setMensaje({ tipo: 'success', texto: fichaEditando ? 'Ficha médica actualizada.' : 'Ficha médica creada correctamente.' });
      limpiarFormularioFicha();
      await cargarDatosCliente(correoCliente);
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo conectar con fichas-service.' });
    } finally {
      setEnviandoFicha(false);
    }
  };

  const editarFicha = (ficha: FichaMedica) => {
    setFichaEditando(ficha.id);
    setMascotaId(String(ficha.mascota.id));
    setMotivoConsulta(ficha.motivoConsulta);
    setDiagnostico(ficha.diagnostico ?? '');
    setTratamiento(ficha.tratamiento ?? '');
    setVeterinario(ficha.veterinario);
    setEstado(ficha.estado);
    setFechaAtencion(ficha.fechaAtencion);
    setMensaje(null);
    document.getElementById('formulario-ficha')?.scrollIntoView({ behavior: 'smooth' });
  };

  const eliminarFicha = async (ficha: FichaMedica) => {
    if (!window.confirm(`¿Eliminar la ficha "${ficha.motivoConsulta}" de ${ficha.mascota.nombre}?`)) return;
    try {
      const respuesta = await fetch(`${API_FICHAS}/${ficha.id}`, { method: 'DELETE', headers: encabezados() });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo eliminar el registro.') });
        return;
      }
      if (fichaEditando === ficha.id) limpiarFormularioFicha();
      setMensaje({ tipo: 'success', texto: 'Ficha médica eliminada.' });
      await cargarDatosCliente(correoCliente);
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo eliminar la ficha médica.' });
    }
  };

  const eliminarMascota = async (mascota: Mascota) => {
    if (!window.confirm(`¿Eliminar a ${mascota.nombre}? También se eliminarán todas sus fichas médicas.`)) return;
    try {
      const respuesta = await fetch(`${API_MASCOTAS}/${mascota.id}`, { method: 'DELETE', headers: encabezados() });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo eliminar el registro.') });
        return;
      }
      if (mascotaId === String(mascota.id)) {
        setMascotaId('');
        limpiarFormularioFicha();
      }
      setMensaje({ tipo: 'success', texto: `Mascota "${mascota.nombre}" eliminada.` });
      await cargarDatosCliente(correoCliente);
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo eliminar la mascota.' });
    }
  };

  return (
    <>
      {mensaje && <div className={`alert alert-${mensaje.tipo} py-2`}>{mensaje.texto}</div>}

      {/* Selección del cliente */}
      <div className="ficha shadow-sm rounded mb-4">
        <label className="form-label fw-bold">Cliente:</label>
        <select className="form-select" value={correoCliente} onChange={(e) => seleccionarCliente(e.target.value)}>
          <option value="">-- Seleccione un cliente --</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.correo}>
              {cliente.nombreCompleto} ({cliente.correo})
            </option>
          ))}
        </select>
      </div>

      {correoCliente !== '' && (
        <>
          <div className="row">
            {/* Registro de mascota */}
            <div className="col-lg-5 mb-4">
              <form className="ficha shadow-sm rounded h-100" onSubmit={registrarMascota}>
                <h5 className="fw-bold mb-3">Registrar mascota</h5>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Especie</label>
                  <input className="form-control" placeholder="Perro, Gato, Conejo..." value={especie} onChange={(e) => setEspecie(e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-8 mb-2">
                    <label className="form-label">Raza</label>
                    <input className="form-control" value={raza} onChange={(e) => setRaza(e.target.value)} />
                  </div>
                  <div className="col-4 mb-2">
                    <label className="form-label">Edad</label>
                    <input type="number" min="0" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-success mt-2" disabled={enviandoMascota}>
                  {enviandoMascota ? 'Guardando...' : 'Registrar mascota'}
                </button>
              </form>
            </div>

            {/* Creación / edición de ficha médica */}
            <div className="col-lg-7 mb-4">
              <form id="formulario-ficha" className="ficha shadow-sm rounded h-100" onSubmit={guardarFicha}>
                <h5 className="fw-bold mb-3">{fichaEditando ? 'Editar ficha médica' : 'Nueva ficha médica'}</h5>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Mascota</label>
                    <select className="form-select" value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
                      <option value="">-- Seleccione --</option>
                      {mascotas.map((mascota) => (
                        <option key={mascota.id} value={mascota.id}>{mascota.nombre} ({mascota.especie})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Fecha de atención</label>
                    <input type="date" className="form-control" value={fechaAtencion} onChange={(e) => setFechaAtencion(e.target.value)} />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Motivo de consulta</label>
                  <input className="form-control" value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Diagnóstico</label>
                  <textarea className="form-control" rows={2} value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tratamiento</label>
                  <textarea className="form-control" rows={2} value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-md-7 mb-2">
                    <label className="form-label">Veterinario</label>
                    <input className="form-control" value={veterinario} onChange={(e) => setVeterinario(e.target.value)} />
                  </div>
                  <div className="col-md-5 mb-2">
                    <label className="form-label">Estado</label>
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value as 'EN_ATENCION' | 'ALTA')}>
                      <option value="EN_ATENCION">En atención</option>
                      <option value="ALTA">Alta</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button type="submit" className="btn btn-success" disabled={enviandoFicha}>
                    {enviandoFicha ? 'Guardando...' : fichaEditando ? 'Guardar cambios' : 'Crear ficha'}
                  </button>
                  {fichaEditando && (
                    <button type="button" className="btn btn-secondary" onClick={limpiarFormularioFicha}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <h3 className="fw-bold mb-3">Mascotas y fichas del cliente</h3>
          <HistorialMascotas
            mascotas={mascotas}
            fichas={fichas}
            onEditarFicha={editarFicha}
            onEliminarFicha={eliminarFicha}
            onEliminarMascota={eliminarMascota}
          />
        </>
      )}
    </>
  );
}
