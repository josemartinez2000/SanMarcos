import type { FichaMedica } from '../services/api';

interface Props {
  ficha: FichaMedica;
  onEditar?: (ficha: FichaMedica) => void;
  onEliminar?: (ficha: FichaMedica) => void;
}

// Muestra una ficha médica; los botones solo aparecen si se entregan las acciones (modo administrador)
export default function TarjetaFicha({ ficha, onEditar, onEliminar }: Props) {
  const enAtencion = ficha.estado === 'EN_ATENCION';

  return (
    <div className="border rounded p-3 mb-3 bg-white">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h6 className="fw-bold mb-1">{ficha.motivoConsulta}</h6>
          <small className="text-muted">
            Atención: {ficha.fechaAtencion} · {ficha.veterinario}
          </small>
        </div>
        <span className={`badge ${enAtencion ? 'bg-warning text-dark' : 'bg-success'}`}>
          {enAtencion ? 'En atención' : 'Alta'}
        </span>
      </div>

      <p className="mb-1 mt-2"><strong>Diagnóstico:</strong> {ficha.diagnostico || 'Sin diagnóstico registrado.'}</p>
      <p className="mb-0"><strong>Tratamiento:</strong> {ficha.tratamiento || 'Sin tratamiento registrado.'}</p>

      {(onEditar || onEliminar) && (
        <div className="d-flex gap-2 mt-3">
          {onEditar && (
            <button className="btn btn-sm btn-primary" onClick={() => onEditar(ficha)}>
              Editar ficha
            </button>
          )}
          {onEliminar && (
            <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(ficha)}>
              Eliminar ficha
            </button>
          )}
        </div>
      )}
    </div>
  );
}
