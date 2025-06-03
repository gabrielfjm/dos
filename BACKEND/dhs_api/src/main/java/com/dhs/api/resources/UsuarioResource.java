package com.dhs.api.resources;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dhs.api.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dhs.api.services.UsuarioService;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioResource {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll(){
        List<Usuario> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> finById(@PathVariable Long id){
        Usuario obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/apelido/{apelido}")
    public ResponseEntity<Usuario> finByApelido(@PathVariable String apelido){
        Usuario obj = service.findByApelido(apelido);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity<Usuario> finByEmail(@PathVariable String email){
        Usuario obj = service.findByEmail(email);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Usuario> insert(@RequestBody Usuario obj){
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
    public ResponseEntity<Usuario> update(@PathVariable Long id, @RequestBody Usuario obj){
        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        Map<String, Object> response = new HashMap<>();

        Map<String, Object> userInfo = service.verificarLogin(email, senha);

        if (userInfo != null) {
            response.put("success", true);
            response.put("message", "Login realizado com sucesso!");
            response.put("userId", userInfo.get("id"));
            response.put("Apelido", userInfo.get("Apelido"));
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Credenciais inválidas.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
