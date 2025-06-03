package com.dhs.api.resources;

import com.dhs.api.entities.Secretaria;
import com.dhs.api.services.SecretariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/secretarias")
public class SecretariaResource {

    @Autowired
    private SecretariaService service;

    @GetMapping
    public ResponseEntity<List<Secretaria>> findAll(){
        List<Secretaria> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Secretaria> finById(@PathVariable Long id){
        Secretaria obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Secretaria> insert(@RequestBody Secretaria obj){
        obj = service.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Secretaria> update(@PathVariable Long id, @RequestBody Secretaria obj){
        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }
}
