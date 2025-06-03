package com.dhs.api.services;

import com.dhs.api.entities.Computador;
import com.dhs.api.repositories.ComputadorRepository;
import com.dhs.api.services.exceptions.DatabaseException;
import com.dhs.api.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ComputadorService {

    @Autowired
    private ComputadorRepository repository;

    public List<Computador> findAll(){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "dataTermino"));
    }

    public Computador findById(Long id) {
        Optional<Computador> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Computador insert(Computador obj) {
        return repository.save(obj);
    }

    public Computador excluir(long id){
        Computador computadorExcluido = repository.findById(id).orElse(null);
        computadorExcluido.setExcluido(true);
        return repository.save(computadorExcluido);
    }

    public Computador cancelarExclusao(long id){
        Computador computadorCancelarExclusao = repository.findById(id).orElse(null);
        computadorCancelarExclusao.setExcluido(false);
        return repository.save(computadorCancelarExclusao);
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

    public Computador update(Long id, Computador obj) {
        try {
            Computador entity = repository.getReferenceById(id);
            updateData(entity, obj);
            return repository.save(entity);
        }catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Computador entity, Computador obj) {
        entity.setArmazenamento(obj.getArmazenamento());
        entity.setDataEntrada(obj.getDataEntrada());
        entity.setDataTermino(obj.getDataTermino());
        entity.setEstado(obj.getEstado());
        entity.setItensTrocados(obj.getItensTrocados());
        entity.setMemoriaRAM(obj.getMemoriaRAM());
        entity.setOrigem(obj.getOrigem());
        entity.setNumeroChamado(obj.getNumeroChamado());
        entity.setProblema(obj.getProblema());
        entity.setProcessador(obj.getProcessador());
        entity.setQuemFez(obj.getQuemFez());
        entity.setSolicitante(obj.getSolicitante());
        entity.setTroca(obj.isTroca());
    }

    public List<Computador> buscar(String conteudo) {
        return repository.searchByPatrimonioOrNumeroChamado(conteudo);
    }

    public Computador retirar(Long id, Date dataRetirada, String quemRetirou){
        Computador computadorRetirado = repository.findById(id).orElse(null);
        computadorRetirado.setDataRetirada(dataRetirada);
        computadorRetirado.setQuemRetirou(quemRetirou);
        return repository.save(computadorRetirado);
    }
}
