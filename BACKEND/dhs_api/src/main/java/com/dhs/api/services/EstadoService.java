package com.dhs.api.services;

import com.dhs.api.entities.Estado;
import com.dhs.api.repositories.EstadoRepository;
import com.dhs.api.services.exceptions.DatabaseException;
import com.dhs.api.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository repository;

    public List<Estado> findAll(){
        return repository.findAll();
    }

    public Estado findById(Long id) {
        Optional<Estado> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Estado insert(Estado obj) {
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

    public Estado update(Long id, Estado obj) {
        try {
            Estado entity = repository.getReferenceById(id);
            updateData(entity, obj);
            return repository.save(entity);
        }catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Estado entity, Estado obj) {
        entity.setDescricao(obj.getDescricao());
    }
}
