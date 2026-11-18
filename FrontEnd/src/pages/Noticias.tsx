import { Link } from 'react-router-dom';

export default function Noticias() {
  return (
    <>
      <header className="inicio text-center">
        <div className="container">
          <h1>Todas las Noticias</h1>
          <p className="lead">Entérate de todas las novedades y campañas de nuestra veterinaria</p>
        </div>
      </header>

      <section className="container my-5">
        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia1.jpg" alt="Campaña de vacunación" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Campaña de vacunacion gratuita</h5>
                <p className="card-text">
                  Durante todo este mes ofrecemos vacunas antirrábicas sin costo para mascotas
                  del sector de Valle Grande y alrededores. La campaña está dirigida a perros y
                  gatos mayores de 3 meses, y no requiere inscripción previa.
                </p>
                <p className="card-text">
                  <strong>Fecha:</strong> Todo septiembre 2026<br />
                  <strong>Lugar:</strong> Veterinaria Huellitas, Valle Grande, Lampa<br />
                  <strong>Requisitos:</strong> Traer a la mascota con correa o transportadora
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia2.jpg" alt="Nuevo horario de atención" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Nuevo horario de atención</h5>
                <p className="card-text">
                  A partir de este mes, ampliamos nuestro horario de atención para casos de
                  urgencia. Ahora contamos con atención los días domingo en la mañana, además
                  de nuestro horario habitual de lunes a sábado.
                </p>
                <p className="card-text">
                  <strong>Nuevo horario domingo:</strong> 9:00 a 13:00 hrs<br />
                  <strong>Lunes a sábado:</strong> 9:00 a 20:00 hrs<br />
                  <strong>Urgencias:</strong> Consultar disponibilidad por teléfono
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia3.jpg" alt="Jornada de esterilización" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Jornada de esterilización</h5>
                <p className="card-text">
                  Súmate a nuestra jornada de esterilización a precio reducido para perros y
                  gatos. Los cupos son limitados y se asignan por orden de inscripción,
                  incluye control post operatorio sin costo adicional.
                </p>
                <p className="card-text">
                  <strong>Cupos disponibles:</strong> 30<br />
                  <strong>Incluye:</strong> Cirugia, medicamentos y control post operatorio<br />
                  <strong>Inscripciones:</strong> Por telefono en nuestras instalaciones
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia4.jpg" alt="Nueva sala de rayos X" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Nueva sala de rayos X</h5>
                <p className="card-text">
                  Incorporamos un nuevo equipo de rayos X digital, lo que nos permite obtener
                  diagnósticos más rápidos y precisos sin que tu mascota tenga que trasladarse
                  a otro centro para este examen
                </p>
                <p className="card-text">
                  <strong>Disponible desde:</strong> Este mes<br />
                  <strong>Atiende:</strong> Perros, gatos y mascotas exoticas<br />
                  <strong>Reserva:</strong> Con hora previa
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia5.jpg" alt="Charla de tenencia responsable" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Charla de tenencia responsable</h5>
                <p className="card-text">
                  Organizamos una charla gratuita sobre tenencia responsable de mascotas,
                  dirigida a toda la comunidad. Hablaremos de cuidados básicos, alimentación,
                  vacunación y esterilización.
                </p>
                <p className="card-text">
                  <strong>Dirigido a:</strong> Toda la comunidad<br />
                  <strong>Cupos:</strong> Libres, sin inscripción previa<br />
                  <strong>Duración:</strong> Aproximadamente 1 hora
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card tarjeta-noticia h-100">
              <img src="/img/noticia6.jpg" alt="Descuento en peluquería" className="img-noticia" />
              <div className="card-body">
                <h5 className="card-title">Descuento en peluquería canina</h5>
                <p className="card-text">
                  Este mes tenemos descuento especial en todos nuestros servicios de
                  peluquería canina y felina: baño, corte y desenredo, con productos
                  hipoalergénicos aptos para pieles sensibles.
                </p>
                <p className="card-text">
                  <strong>Descuento:</strong> 20% en todos los servicios<br />
                  <strong>Válido hasta:</strong> Fin de mes<br />
                  <strong>Reserva:</strong> Por teléfono o presencial
                </p>
              </div>
            </div>
          </div>

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