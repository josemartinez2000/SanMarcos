import { Link } from 'react-router-dom';
import CardNoticia from '../molecules/CardNoticia';

function Principal() {
  return (
    <>
      <header className="inicio">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1>Cuidamos a quienes mas amas</h1>
              <p className="lead">Atención veterinaria cercana, calida y profesional para tu mascota</p>
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
                <li>Medicos veterinarios certificados</li>
                <li>Atencion de urgencias</li>
                <li>Instalaciones limpias y comodas</li>
                <li>Precios accesibles</li>
                <li>Flexibilidad a pagos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="noticias" className="fondo-verde py-5">
        <div className="container">
          <h2 className="text-center mb-4">Noticias</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <CardNoticia 
                imagen="/img/noticia1.jpg" 
                titulo="Campaña de vacunación gratuita" 
                descripcion="Durante este mes de septiembre ofrecemos vacunas antirrabicas sin costo para mascotas del sector." 
              />
            </div>
            <div className="col-md-4 mb-4">
              <CardNoticia 
                imagen="/img/noticia2.jpg" 
                titulo="Nuevo horario de atención" 
                descripcion="Ahora atendemos también los domingos en la mañana desde las 08:00 hrs  hasta las 23:00 hrs para casos de urgencia." 
              />
            </div>
            <div className="col-md-4 mb-4">
              <CardNoticia 
                imagen="/img/noticia3.jpg" 
                titulo="Jornada de esterilización" 
                descripcion="Inscribete a nuestra jornada de esterilizacion a precio reducido, cupos limitados." 
              />
            </div>
          </div>
          <div className="text-center">
            <Link to="/noticias" className="btn boton-opcion">Ver mas</Link>
          </div>
        </div>
      </section>

      <section id="servicios" className="container my-5">
        <h2 className="text-center mb-4">¿Que necesitas hoy?</h2>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className="tarjeta-opcion text-center">
              <h4>Catalogo de Servicios</h4>
              <p>Consultas, cirugias, peluqueria y mas servicios para tu mascota.</p>
              <Link to="/catalogo" className="btn boton-opcion">Ver Servicios</Link>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="tarjeta-opcion text-center">
              <h4>Medicamentos y Vacunas</h4>
              <p>Revisa nuestro catalogo de medicamentos y el calendario de vacunacion.</p>
              <Link to="/med-vac" className="btn boton-opcion">Ver Medicamentos</Link>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default Principal;