package cl.sanmarcos.noticias.service;

import cl.sanmarcos.noticias.model.Noticia;
import cl.sanmarcos.noticias.repository.NoticiaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    public NoticiaService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    // Las noticias más recientes aparecen primero
    public List<Noticia> listar() {
        return noticiaRepository.findAllByOrderByFechaPublicacionDescIdDesc();
    }

    public Optional<Noticia> buscarPorId(Long id) {
        return noticiaRepository.findById(id);
    }

    public Noticia guardar(Noticia noticia) {
        noticia.setId(null);
        if (noticia.getFechaPublicacion() == null) {
            noticia.setFechaPublicacion(LocalDate.now());
        }
        return noticiaRepository.save(noticia);
    }

    public Optional<Noticia> actualizar(Long id, Noticia datos) {
        return noticiaRepository.findById(id).map(noticia -> {
            noticia.setTitulo(datos.getTitulo());
            noticia.setResumen(datos.getResumen());
            noticia.setContenido(datos.getContenido());
            noticia.setImagen(datos.getImagen());
            if (datos.getFechaPublicacion() != null) {
                noticia.setFechaPublicacion(datos.getFechaPublicacion());
            }
            return noticiaRepository.save(noticia);
        });
    }

    public boolean eliminar(Long id) {
        if (!noticiaRepository.existsById(id)) {
            return false;
        }
        noticiaRepository.deleteById(id);
        return true;
    }
}
