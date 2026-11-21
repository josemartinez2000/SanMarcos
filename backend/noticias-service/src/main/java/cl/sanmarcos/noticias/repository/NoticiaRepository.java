package cl.sanmarcos.noticias.repository;

import cl.sanmarcos.noticias.model.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {

    List<Noticia> findAllByOrderByFechaPublicacionDescIdDesc();
}
