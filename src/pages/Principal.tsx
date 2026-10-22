import { Link } from 'react-router-dom';

export default function Principal() {
  return (
    <>
      <header className="inicio">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1>Cuidamos a quienes más amas</h1>
              <p className="lead">Atención veterinaria cercana, cálida y profesional para tu mascota</p>
            </div>
            <div className="col-md-6 text-center">
              <div id="carruselInicio" className="carousel slide img-inicio" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/img/portada2.jpg" className="d-block w-100" alt="Mascota en la veterinaria" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/portada3.jpg" className="d-block w-100" alt="Mascota jugando" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/portada4.jpg" className="d-block w-100" alt="Mascota en control veterinario" />
                  </div>
                </div>

                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="2"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="nosotros" className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/img/nosotros.jpg" alt="Equipo de la veterinaria" className="img-nosotros mb-4 mb-md-0" />
          </div>
          <div className="col-md-6">
            <h2>Sobre Nosotros</h2>
            <p>
              En Veterinaria San Marcos llevamos más de 10 años cuidando la salud y el bienestar
              de perros, gatos y otras mascotas de nuestra comunidad. Contamos con un equipo de
              médicos veterinarios apasionados por los animales, equipo moderno y un trato
              humano tanto para las mascotas como para sus familias.
            </p>
            <p>
              Creemos que cada mascota merece atención personalizada, por eso combinamos
              experiencia clínica con mucho cariño en cada consulta.
            </p>
            <div className="caja-info">
              <h5>¿Por qué elegirnos?</h5>
              <ul>
                <li>Médicos veterinarios certificados</li>
                <li>Atención de urgencias</li>
                <li>Instalaciones limpias y cómodas</li>
                <li>Precios accesibles</li>
                <li>Flexibilidad a pagos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="noticias" className="fondo-verde py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-white">Noticias</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card tarjeta-noticia">
                <img src="/img/noticia1.jpg" alt="Campaña de vacunación" className="img-noticia" />
                <div className="card-body">
                  <h5 className="card-title">Campaña de vacunación gratuita</h5>
                  <p className="card-text">Durante este mes de octubre ofrecemos vacunas antirrábicas sin costo para mascotas del sector.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card tarjeta-noticia">
                <img src="/img/noticia2.jpg" alt="Nuevo horario de atención" className="img-noticia" />
                <div className="card-body">
                  <h5 className="card-title">Nuevo horario de atención</h5>
                  <p className="card-text">Ahora atendemos también los domingos en la mañana desde las 08:00 hrs hasta las 23:00 hrs para casos de urgencia.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card tarjeta-noticia">
                <img src="/img/noticia3.jpg" alt="Jornada de esterilización" className="img-noticia" />
                <div className="card-body">
                  <h5 className="card-title">Jornada de esterilización</h5>
                  <p className="card-text">Inscríbete a nuestra jornada de esterilización a precio reducido, cupos limitados.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/noticias" className="btn boton-opcion bg-white text-dark">Ver más</Link>
          </div>
        </div>
      </section>

      <section id="servicios" className="container my-5">
        <h2 className="text-center mb-4">¿Qué necesitas hoy?</h2>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className="tarjeta-opcion text-center">
              <h4>Catálogo de Servicios</h4>
              <p>Consultas, cirugías, peluquería y más servicios para tu mascota.</p>
              <Link to="/catalogo" className="btn boton-opcion">Ver Servicios</Link>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="tarjeta-opcion text-center">
              <h4>Medicamentos y Vacunas</h4>
              <p>Revisa nuestro catálogo de medicamentos y el calendario de vacunación.</p>
              <Link to="/med-vac" className="btn boton-opcion">Ver Medicamentos</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}