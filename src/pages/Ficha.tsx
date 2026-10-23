import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Catálogo global con formato espaciado
const catalogoGlobal = [
  { 
    id: "SV001", 
    nombre: "Consulta general" 
  },
  { 
    id: "SV002", 
    nombre: "Consulta urgencia" 
  },
  { 
    id: "SV003", 
    nombre: "Control postoperatorio" 
  },
  { 
    id: "SV004", 
    nombre: "Consulta ave / conejo" 
  },
  { 
    id: "SV005", 
    nombre: "Segunda opinión médica" 
  },
  { 
    id: "CI001", 
    nombre: "Esterilización hembra canina" 
  },
  { 
    id: "CI002", 
    nombre: "Esterilización macho canino" 
  },
  { 
    id: "CI003", 
    nombre: "Esterilización hembra felina" 
  },
  { 
    id: "CI004", 
    nombre: "Esterilización macho felino" 
  },
  { 
    id: "CI005", 
    nombre: "Extirpación de tumor cutáneo" 
  },
  { 
    id: "CI006", 
    nombre: "Cesárea de urgencia" 
  },
  { 
    id: "DE001", 
    nombre: "Desparasitación interna pequeños (<10 kg)" 
  },
  { 
    id: "DE002", 
    nombre: "Desparasitación interna medianos (10-25 kg)" 
  },
  { 
    id: "DE003", 
    nombre: "Desparasitación interna grandes (>25 kg)" 
  },
  { 
    id: "DE004", 
    nombre: "Desparasitación interna felina" 
  },
  { 
    id: "DE005", 
    nombre: "Antiparasitario externo (pipeta)" 
  },
  { 
    id: "EX001", 
    nombre: "Hemograma completo" 
  },
  { 
    id: "EX002", 
    nombre: "Perfil bioquímico completo" 
  },
  { 
    id: "EX003", 
    nombre: "Radiografía (1 proyección)" 
  },
  { 
    id: "EX004", 
    nombre: "Ecografía abdominal" 
  },
  { 
    id: "EX005", 
    nombre: "Test de leishmaniasis" 
  },
  { 
    id: "OT001", 
    nombre: "Corte de uñas" 
  },
  { 
    id: "OT002", 
    nombre: "Limpieza dental" 
  },
  { 
    id: "OT003", 
    nombre: "Microchip identificación" 
  },
  { 
    id: "OT004", 
    nombre: "Hospitalización (por día)" 
  },
  { 
    id: "VA001", 
    nombre: "Vacuna antirrábica canina" 
  },
  { 
    id: "VA002", 
    nombre: "Vacuna sextuple canina" 
  },
  { 
    id: "VA003", 
    nombre: "Vacuna bivalente felina" 
  },
  { 
    id: "VA004", 
    nombre: "Vacuna triple felina" 
  },
  { 
    id: "VA005", 
    nombre: "Vacuna Bordetella canina" 
  },
  { 
    id: "VA006", 
    nombre: "Vacuna antirrábica felina" 
  },
  { 
    id: "ME001", 
    nombre: "Amoxibay 250mg" 
  },
  { 
    id: "ME002", 
    nombre: "Enrox 50mg" 
  },
  { 
    id: "ME003", 
    nombre: "Metrobay 250mg" 
  },
  { 
    id: "ME004", 
    nombre: "Nexgard" 
  },
  { 
    id: "ME005", 
    nombre: "Bravecto" 
  },
  { 
    id: "ME006", 
    nombre: "Revolution Plus" 
  },
  { 
    id: "ME007", 
    nombre: "Drontal Plus" 
  },
  { 
    id: "ME008", 
    nombre: "Milbemax Gato" 
  },
  { 
    id: "ME009", 
    nombre: "Meloxicam 1mg" 
  },
  { 
    id: "ME010", 
    nombre: "Carprofen 50mg" 
  },
  { 
    id: "ME011", 
    nombre: "Clorhexidina shampoo" 
  },
  { 
    id: "ME012", 
    nombre: "Malaseb shampoo" 
  },
  { 
    id: "ME013", 
    nombre: "Apoquel 16mg" 
  },
  { 
    id: "ME014", 
    nombre: "Probifor" 
  },
  { 
    id: "ME015", 
    nombre: "Omeprazol 10mg vet" 
  },
  { 
    id: "ME016", 
    nombre: "Vetmedin 2.5mg" 
  },
  { 
    id: "ME017", 
    nombre: "Tramadol 50mg vet" 
  },
  { 
    id: "ME018", 
    nombre: "Nobivac DHPPi" 
  },
  { 
    id: "ME019", 
    nombre: "Nobivac Rabies" 
  },
  { 
    id: "ME020", 
    nombre: "Felocell CVR" 
  },
  { 
    id: "ME021", 
    nombre: "Omega vet 3-6-9" 
  },
  { 
    id: "ME022", 
    nombre: "Condrovet forte" 
  }
];

export default function Ficha() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Simulación de sesión: Cambia esto a 'false' para ver la vista de cliente
  const isAdmin = true; 

  // Estados del formulario
  const [medicamento, setMedicamento] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [especie, setEspecie] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [sexo, setSexo] = useState('M');
  const [raza, setRaza] = useState('');
  const [antecedentes, setAntecedentes] = useState('');

  // Busca el producto por ID al cargar la página
  useEffect(() => {
    const productoEncontrado = catalogoGlobal.find(p => p.id === id);
    if (productoEncontrado) {
      setMedicamento(productoEncontrado.nombre);
    } else if (id) {
      setMedicamento(`Producto/Servicio ID: ${id}`);
    }
  }, [id]);

  const guardarFicha = () => {
    alert('Ficha guardada con éxito en la base de datos San Marcos');
    navigate('/modificaciones');
  };

  return (
    <>
      {isAdmin && (
        <div style={{ backgroundColor: 'rgb(61, 61, 61)', padding: '10px 20px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/modificaciones')}>
            Volver
          </button>
        </div>
      )}

      <div className="container my-5">
        <h1 className="text-center mb-4 fw-bold">Ficha de Necropsia</h1>
        
        <div className="ficha-container">
          <div className="ficha shadow-sm rounded">
            
            <div className="d-flex justify-content-end mb-4">
              <div className="lineas_escritura w-50">
                <label className="fw-bold me-2">Fecha necropsia:</label>
                <input type="date" className="input-line" disabled={!isAdmin} />
              </div>
            </div>

            <div className="lineas_escritura mb-4">
              <label className="fw-bold me-2">Servicio Asociado:</label>
              {isAdmin ? (
                <input type="text" className="input-line w-75" value={medicamento} onChange={(e) => setMedicamento(e.target.value)} />
              ) : (
                <span>{medicamento || 'N/A'}</span>
              )}
            </div>
            
            <div className="lineas_escritura">
              <label className="fw-bold me-2">Veterinario:</label>
              <input type="text" className="input-line" disabled={!isAdmin} />
            </div>
            <div className="lineas_escritura mb-4">
              <label className="fw-bold me-2">Teléfono Vet:</label>
              <input type="text" className="input-line" disabled={!isAdmin} />
            </div>

            <div className="lineas_escritura">
              <label className="fw-bold me-2">Propietario:</label>
              {isAdmin ? (
                <input type="text" className="input-line w-75" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
              ) : (
                <span>{propietario || 'N/A'}</span>
              )}
            </div>
            <div className="lineas_escritura">
              <label className="fw-bold me-2">Teléfono Prop:</label>
              {isAdmin ? (
                <input type="text" className="input-line w-75" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              ) : (
                <span>{telefono || 'N/A'}</span>
              )}
            </div>
            <div className="lineas_escritura mb-4">
              <label className="fw-bold me-2">Dirección:</label>
              {isAdmin ? (
                <input type="text" className="input-line w-75" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              ) : (
                <span>{direccion || 'N/A'}</span>
              )}
            </div>

            <div className="row mb-2">
              <div className="col-md-5">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Especie:</label>
                  {isAdmin ? (
                    <input type="text" className="input-line w-50" value={especie} onChange={(e) => setEspecie(e.target.value)} />
                  ) : (
                    <span>{especie || 'N/A'}</span>
                  )}
                </div>
              </div>
              <div className="col-md-7">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Identificación:</label>
                  {isAdmin ? (
                    <input type="text" className="input-line w-50" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                  ) : (
                    <span>{identificacion || 'N/A'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="titulo_seccion">Características generales</div>
            
            <div className="row">
              <div className="col-md-4">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Sexo:</label>
                  {isAdmin ? (
                    <select className="input-line" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                      <option value="M">M</option>
                      <option value="H">H</option>
                    </select>
                  ) : (
                    <span>{sexo}</span>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Raza:</label>
                  {isAdmin ? (
                    <input type="text" className="input-line w-75" value={raza} onChange={(e) => setRaza(e.target.value)} />
                  ) : (
                    <span>{raza || 'N/A'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="lineas_escritura">
              <label className="fw-bold me-2">Fecha nacimiento:</label>
              <input type="text" className="input-line" placeholder="....../....../......." disabled={!isAdmin} />
              <label className="ms-2 fw-bold me-2">o edad estimada:</label>
              <input type="text" className="input-line" disabled={!isAdmin} />
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Peso:</label>
                  <input type="text" className="input-line" disabled={!isAdmin} />
                  <label className="ms-1">(Kg.)</label>
                </div>
              </div>
              <div className="col-md-7">
                <div className="lineas_escritura">
                  <label className="fw-bold me-2">Condición corporal:</label>
                  <input type="text" className="input-line" disabled={!isAdmin} />
                </div>
              </div>
            </div>

            <div className="lineas_escritura">
              <label className="fw-bold me-2">Grado de descomposición:</label>
              <input type="text" className="input-line" disabled={!isAdmin} />
            </div>

            <div className="titulo_seccion">
              <label className="fw-bold">Antecedentes</label>
              <span style={{ fontWeight: 'normal', textDecoration: 'none', marginLeft: '5px' }}>
                (desparasitaciones, vacunaciones, patologías anteriores, etc)
              </span>
            </div>
            {isAdmin ? (
              <textarea 
                className="textarea-clean form-control mb-4" 
                rows={3} 
                value={antecedentes} 
                onChange={(e) => setAntecedentes(e.target.value)}
              />
            ) : (
              <p className="mb-4 bg-light p-3 rounded">{antecedentes || 'Sin antecedentes registrados.'}</p>
            )}

            <div className="titulo_seccion">Examen externo</div>
            <div className="mb-3">
              <p className="mb-0 fw-bold">Piel, mucosas y anexos:</p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            <div className="mb-3">
              <p className="mb-0 fw-bold">Aberturas naturales:</p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
          </div>

          <div className="ficha shadow-sm rounded">
            <h5 className="fw-bold mb-4 text-decoration-underline">Examen interno</h5>

            <div className="historial_examenes">
              <p className="fw-bold">Sist. Respiratorio <em className="fw-normal">(narinas, tráquea, bronquios, pulmones)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>

            <div className="historial_examenes">
              <p className="fw-bold">Sist. Cardiovascular <em className="fw-normal">(corazón, grandes vasos)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>

            <div className="historial_examenes">
              <p className="fw-bold">Sist. Digestivo <em className="fw-normal">(boca, lengua, esófago, estómago, ID, IG, recto. Hígado)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>

            <div className="historial_examenes">
              <p className="fw-bold">Sist. Reproductor <em className="fw-normal">(ovarios, útero, vagina, vestíbulo, genitales externos)(testículos, próstata, vesícula seminal, pene)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            
            <div className="historial_examenes">
              <p className="fw-bold">Sist. Urinario <em className="fw-normal">(riñones, vejiga, uréteres, uretra)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            
            <div className="historial_examenes">
              <p className="fw-bold">Sist. Inmunitario <em className="fw-normal">(linfonodos, bazo, amígdalas, timo)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            
            <div className="historial_examenes">
              <p className="fw-bold">Sist. Nervioso <em className="fw-normal">(cerebro, tallo, médula, ojos, SNP)</em></p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            
            <div className="historial_examenes">
              <p className="fw-bold">Otros:</p>
              <textarea className="textarea-clean form-control" rows={2} disabled={!isAdmin}></textarea>
            </div>
            
            <div className="historial_examenes mt-5">
              <h5 className="fw-bold">Muestras remitidas</h5>
              <textarea className="textarea-clean form-control" rows={3} disabled={!isAdmin}></textarea>
            </div>
          </div>

          <div className="botones d-flex justify-content-end gap-3 mt-4 mb-5">
            <button className="btn btn-outline-dark" onClick={() => window.print()}>
              🖨️ Imprimir Ficha
            </button>
            {isAdmin && (
              <button className="btn btn-success" onClick={guardarFicha}>
                💾 Guardar Ficha
              </button>
            )}
            {!isAdmin && (
              <Link to="/" className="btn btn-secondary">
                Volver a la Página Principal
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}