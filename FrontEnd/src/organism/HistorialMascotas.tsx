import TarjetaFicha from '../molecules/TarjetaFicha';
import type { FichaMedica, Mascota } from '../services/api';

interface Props {
  mascotas: Mascota[];
  fichas: FichaMedica[];
  onEditarFicha?: (ficha: FichaMedica) => void;
  onEliminarFicha?: (ficha: FichaMedica) => void;
  onEliminarMascota?: (mascota: Mascota) => void;
}

// Agrupa las fichas médicas bajo cada mascota del cliente
export default function HistorialMascotas({ mascotas, fichas, onEditarFicha, onEliminarFicha, onEliminarMascota }: Props) {
  if (mascotas.length === 0) {
    return <div className="alert alert-info">No hay mascotas registradas para este cliente.</div>;
  }

  return (
    <div className="row">
      {mascotas.map((mascota) => {
        const fichasMascota = fichas.filter((ficha) => ficha.mascota.id === mascota.id);
        return (
          <div key={mascota.id} className="col-lg-6 mb-4">
            <div className="ficha shadow-sm rounded h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h4 className="fw-bold mb-1">{mascota.nombre}</h4>
                  <p className="text-muted mb-3">
                    {mascota.especie}
                    {mascota.raza ? ` · ${mascota.raza}` : ''}
                    {mascota.edad !== null && mascota.edad !== undefined ? ` · ${mascota.edad} año(s)` : ''}
                  </p>
                </div>
                {onEliminarMascota && (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminarMascota(mascota)}>
                    Eliminar mascota
                  </button>
                )}
              </div>

              <div className="titulo_seccion">Fichas médicas ({fichasMascota.length})</div>

              {fichasMascota.length === 0 ? (
                <p className="text-muted">Esta mascota aún no tiene fichas médicas.</p>
              ) : (
                fichasMascota.map((ficha) => (
                  <TarjetaFicha
                    key={ficha.id}
                    ficha={ficha}
                    onEditar={onEditarFicha}
                    onEliminar={onEliminarFicha}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
