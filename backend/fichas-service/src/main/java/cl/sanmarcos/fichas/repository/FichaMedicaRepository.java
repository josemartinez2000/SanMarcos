package cl.sanmarcos.fichas.repository;

import cl.sanmarcos.fichas.model.FichaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FichaMedicaRepository extends JpaRepository<FichaMedica, Long> {

    List<FichaMedica> findAllByOrderByFechaAtencionDesc();

    List<FichaMedica> findByMascotaCorreoClienteOrderByFechaAtencionDesc(String correoCliente);

    List<FichaMedica> findByMascotaIdOrderByFechaAtencionDesc(Long mascotaId);
}
