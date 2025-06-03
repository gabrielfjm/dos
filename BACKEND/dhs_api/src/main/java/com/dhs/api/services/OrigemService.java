package com.dhs.api.services;

import com.dhs.api.entities.Origem;
import com.dhs.api.repositories.OrigemRepository;
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
public class OrigemService {

    @Autowired
    private OrigemRepository repository;

    public List<Origem> findAll(){
        return repository.findAll();
    }

    public Origem findById(Long id) {
        Optional<Origem> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Origem insert(Origem obj) {
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

    public Origem update(Long id, Origem obj) {
        try {
            Origem entity = repository.getReferenceById(id);
            updateData(entity, obj);
            return repository.save(entity);
        }catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Origem entity, Origem obj) {
        entity.setDescricao(obj.getDescricao());
        entity.setSecretaria(obj.getSecretaria());
    }
}
