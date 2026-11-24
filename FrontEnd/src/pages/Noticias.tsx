import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_NOTICIAS, encabezados, obtenerMensajeError, obtenerSesion, type Noticia } from '../services/api';

export default function Noticias() {
  const esAdmin = obtenerSesion().rol === 'ADMIN';

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Formulario de publicación (solo administrador)
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState('/img/noticia1.jpg');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

  // Al incrementar este contador se vuelve a consultar la lista de noticias
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const respuesta = await fetch(API_NOTICIAS);
        if (!respuesta.ok) throw new Error();
        setNoticias(await respuesta.json());
        setError('');
      } catch {
        setError('No se pudieron cargar las noticias. Verifique que noticias-service (puerto 8085) esté activo.');
      } finally {
        setCargando(false);
      }
    };
    cargarNoticias();
  }, [recarga]);

  const publicarNoticia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando) return;
    if (titulo.trim() === '' || resumen.trim() === '' || contenido.trim() === '') {
      setMensaje({ tipo: 'danger', texto: 'Título, resumen y contenido son obligatorios.' });
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(API_NOTICIAS, {
        method: 'POST',
        headers: encabezados(true),
        body: JSON.stringify({
          titulo: titulo.trim(),
          resumen: resumen.trim(),
          contenido: contenido.trim(),
          imagen: imagen.trim()
        })
      });
      if (!respuesta.ok) {
        setMensaje({ tipo: 'danger', texto: await obtenerMensajeError(respuesta, 'No se pudo publicar la noticia.') });
        return;
      }
      setTitulo('');
      setResumen('');
      setContenido('');
      setMensaje({ tipo: 'success', texto: 'Noticia publicada correctamente.' });
      setRecarga((valor) => valor + 1);
    } catch {
      setMensaje({ tipo: 'danger', texto: 'No se pudo conectar con noticias-service.' });
    } finally {
      setEnviando(false);
    }
  };

  const eliminarNoticia = async (noticia: Noticia) => {
    if (!window.confirm(`¿Eliminar la noticia "${noticia.titulo}"?`)) return;
    try {
      const respuesta = await fetch(`${API_NOTICIAS}/${noticia.id}`, { method: 'DELETE', headers: encabezados() });
      if (!respuesta.ok) {
        alert(await obtenerMensajeError(respuesta, 'No se pudo eliminar. Intente nuevamente.'));
        return;
      }
      setRecarga((valor) => valor + 1);
    } catch {
      alert('No se pudo eliminar la noticia.');
    }
  };

  return (
    <>
      <header className="inicio text-center">
        <div className="container">
          <h1>Todas las Noticias</h1>
          <p className="lead">Entérate de todas las novedades y campañas de nuestra veterinaria</p>
        </div>
      </header>

      <section className="container my-5">
        {esAdmin && (
          <form className="ficha shadow-sm rounded mb-5" onSubmit={publicarNoticia}>
            <h4 className="fw-bold mb-3">Publicar nueva noticia</h4>
            {mensaje && <div className={`alert alert-${mensaje.tipo} py-2`}>{mensaje.texto}</div>}
            <div className="row">
              <div className="col-md-8 mb-2">
                <label className="form-label">Título</label>
                <input className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Imagen (ruta)</label>
                <input className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Resumen</label>
              <textarea className="form-control" rows={2} value={resumen} onChange={(e) => setResumen(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contenido (un dato por línea)</label>
              <textarea className="form-control" rows={3} value={contenido} onChange={(e) => setContenido(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success" disabled={enviando}>
              {enviando ? 'Publicando...' : 'Publicar noticia'}
            </button>
          </form>
        )}

        {cargando && (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2">Cargando noticias...</p>
          </div>
        )}

        {error !== '' && <div className="alert alert-danger text-center">{error}</div>}

        {!cargando && error === '' && noticias.length === 0 && (
          <p className="text-center fw-bold">Aún no hay noticias publicadas.</p>
        )}

        <div className="row">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="col-md-4 mb-4">
              <div className="card tarjeta-noticia h-100">
                <img src={noticia.imagen} alt={noticia.titulo} className="img-noticia" />
                <div className="card-body">
                  <h5 className="card-title">{noticia.titulo}</h5>
                  <p className="card-text">{noticia.resumen}</p>
                  <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{noticia.contenido}</p>
                  <p className="card-text">
                    <small className="text-muted">Publicado el {noticia.fechaPublicacion}</small>
                  </p>
                  {esAdmin && (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarNoticia(noticia)}>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <Link to="/" className="btn boton-opcion">Volver al inicio</Link>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">Encuéntranos</h2>
        <div className="ratio ratio-16x9 mapa-caja">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.5670133581725!2d-70.74890604358572!3d-33.33013351225689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662bf6189f5430b%3A0xd39ba7e291523650!2sPje.%20las%20Camelias%20Pte.%2C%20Valle%20Grande%2C%20Lampa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1788552140940!5m2!1ses!2scl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Ubicación Veterinaria San Marcos"
          >
          </iframe>
        </div>
      </section>
    </>
  );
}
