package com.dhs.api.repositories;

import com.dhs.api.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByApelido(String apelido);
    Optional<Usuario> findByEmail(String email);
}
