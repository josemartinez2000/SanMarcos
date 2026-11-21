package cl.sanmarcos.medicamentos.repository;

import cl.sanmarcos.medicamentos.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    Optional<Medicamento> findByCodigo(String codigo);
}
