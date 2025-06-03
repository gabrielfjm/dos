package com.dhs.api.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.dhs.api.entities.Usuario;
import com.dhs.api.repositories.UsuarioRepository;
import com.dhs.api.services.exceptions.DatabaseException;
import com.dhs.api.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    private final PasswordEncoder encoder;

    public UsuarioService(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public List<Usuario> findAll(){
        return repository.findAll();
    }

    public Usuario findById(Long id) {
        Optional<Usuario> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Usuario findByApelido(String apelido) {
        Optional<Usuario> obj = repository.findByApelido(apelido);
        return obj.orElseThrow(() -> new ResourceNotFoundException(apelido));
    }

    public Usuario findByEmail(String email) {
        Optional<Usuario> obj = repository.findByEmail(email);
        return obj.orElseThrow(() -> new ResourceNotFoundException(email));
    }

    public Usuario insert(Usuario obj) {
        obj.setSenha(encoder.encode(obj.getSenha()));
        return repository.save(obj);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        }catch(EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }catch(DataIntegrityViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }

    public Usuario update(Long id, Usuario obj) {
        try {
            Usuario entity = repository.getReferenceById(id);
            updateData(entity, obj);
            return repository.save(entity);
        }catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Usuario entity, Usuario obj) {
        entity.setNomeCompleto(obj.getNomeCompleto());
        entity.setApelido(obj.getApelido());
        entity.setEmail(obj.getEmail());
    }

    public Map<String, Object> verificarLogin(String email, String senha) {
        Map<String, Object> response = new HashMap<>();

        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            boolean valid = encoder.matches(senha, usuario.getSenha());

            if (usuario.getEmail().equals(email) && valid) {
                response.put("id", usuario.getId());
                response.put("Apelido", usuario.getApelido());
                return response;
            }
        }
        return null;
    }
}
