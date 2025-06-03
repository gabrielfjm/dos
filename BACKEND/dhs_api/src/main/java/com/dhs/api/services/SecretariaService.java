package com.dhs.api.services;

import com.dhs.api.entities.Secretaria;
import com.dhs.api.repositories.SecretariaRepository;
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
public class SecretariaService {

    @Autowired
    private SecretariaRepository repository;

    public List<Secretaria> findAll(){
        return repository.findAll();
    }

    public Secretaria findById(Long id) {
        Optional<Secretaria> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Secretaria insert(Secretaria obj) {
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

    public Secretaria update(Long id, Secretaria obj) {
        try {
            Secretaria entity = repository.getReferenceById(id);
            updateData(entity, obj);
            return repository.save(entity);
        }catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Secretaria entity, Secretaria obj) {
        entity.setDescricao(obj.getDescricao());
    }
}
