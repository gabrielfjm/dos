package com.dhs.api.resources;

import com.dhs.api.entities.Origem;
import com.dhs.api.services.OrigemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/origens")
public class OrigemResource {

    @Autowired
    private OrigemService service;

    @GetMapping
    public ResponseEntity<List<Origem>> findAll(){
        List<Origem> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Origem> finById(@PathVariable Long id){
        Origem obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Origem> insert(@RequestBody Origem obj){
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
    public ResponseEntity<Origem> update(@PathVariable Long id, @RequestBody Origem obj){
        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }
}
