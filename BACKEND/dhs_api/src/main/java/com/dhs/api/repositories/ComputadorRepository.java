package com.dhs.api.repositories;

import com.dhs.api.entities.Computador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComputadorRepository extends JpaRepository<Computador, Long> {
    @Query("SELECT c FROM Computador c WHERE c.patrimonio LIKE %:conteudo% OR c.numeroChamado LIKE %:conteudo%")
    List<Computador> searchByPatrimonioOrNumeroChamado(@Param("conteudo") String conteudo);
}
