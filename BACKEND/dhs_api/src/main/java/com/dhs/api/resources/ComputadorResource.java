package com.dhs.api.resources;

import com.dhs.api.entities.Computador;
import com.dhs.api.entities.Estado;
import com.dhs.api.entities.Origem;
import com.dhs.api.repositories.EstadoRepository;
import com.dhs.api.repositories.OrigemRepository;
import com.dhs.api.services.ComputadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/computadores")
public class ComputadorResource {

    @Autowired
    private ComputadorService service;
    @Autowired
    private EstadoRepository estadoRepository;
    @Autowired
    private OrigemRepository origemRepository;


    @GetMapping
    public ResponseEntity<List<Computador>> findAll(){
        List<Computador> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Computador> finById(@PathVariable Long id){
        Computador obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Computador> insert(@RequestBody Map<String, Object> dadosComputador){

        Computador obj = new Computador();

        String patrimonio = dadosComputador.get("patrimonio").toString();
        String solicitante = dadosComputador.get("solicitante").toString();
        String numeroChamado = dadosComputador.get("numeroChamado").toString();

        Long origemR = Long.parseLong(dadosComputador.get("origem").toString());
        Origem origem = origemRepository.findById(origemR).orElse(null);

        String problema = dadosComputador.get("problema").toString();

        String dataEntradaR = dadosComputador.get("dataEntrada").toString();
        Date dataEntrada = Date.valueOf(dataEntradaR);

        String dataTerminoR = dadosComputador.get("dataTermino").toString();
        Date dataTermino = Date.valueOf(dataTerminoR);

        int memoriaRAM = Integer.valueOf(dadosComputador.get("memoriaRAM").toString());
        int armazenamento = Integer.valueOf(dadosComputador.get("armazenamento").toString());
        String processador = dadosComputador.get("processador").toString();

        String trocaR = dadosComputador.get("troca").toString();
        boolean troca;
        if (trocaR.equals("sim")){
            troca = true;
        }else{
            troca = false;
        }

        if(troca == true){
            String itensTrocados = dadosComputador.get("itensTrocados").toString();
            obj.setItensTrocados(itensTrocados);
        }

        String quemFez = dadosComputador.get("quemFez").toString();

        Long estadoR = Long.parseLong(dadosComputador.get("estado").toString());
        Estado estado = estadoRepository.findById(estadoR).orElse(null);

        obj.setPatrimonio(patrimonio);
        obj.setSolicitante(solicitante);
        obj.setNumeroChamado(numeroChamado);
        obj.setOrigem(origem);
        obj.setProblema(problema);
        obj.setDataEntrada(dataEntrada);
        obj.setDataTermino(dataTermino);
        obj.setMemoriaRAM(memoriaRAM);
        obj.setArmazenamento(armazenamento);
        obj.setProcessador(processador);
        obj.setTroca(troca);
        obj.setQuemFez(quemFez);
        obj.setEstado(estado);

        obj = service.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @PutMapping(value = "/editar")
    public ResponseEntity<Computador> update(@RequestBody Map<String, Object> dadosComputador){

        Long id = Long.parseLong(dadosComputador.get("id").toString());

        Computador obj = new Computador();

        obj.setSolicitante(dadosComputador.get("solicitante").toString());
        obj.setNumeroChamado(dadosComputador.get("numeroChamado").toString());

        Long origemR = Long.parseLong(dadosComputador.get("origem").toString());
        Origem origem = origemRepository.findById(origemR).orElse(null);
        obj.setOrigem(origem);

        obj.setProblema(dadosComputador.get("problema").toString());

        String dataEntradaR = dadosComputador.get("dataEntrada").toString();
        Date dataEntrada = Date.valueOf(dataEntradaR);
        obj.setDataEntrada(dataEntrada);

        String dataTerminoR = dadosComputador.get("dataTermino").toString();
        Date dataTermino = Date.valueOf(dataTerminoR);
        obj.setDataTermino(dataTermino);

        obj.setMemoriaRAM(Integer.valueOf(dadosComputador.get("memoriaRAM").toString()));
        obj.setArmazenamento(Integer.valueOf(dadosComputador.get("armazenamento").toString()));
        obj.setProcessador(dadosComputador.get("processador").toString());

        String trocaR = dadosComputador.get("troca").toString();
        boolean troca;
        if (trocaR.equals("sim")){
            troca = true;
        }else{
            troca = false;
        }

        obj.setTroca(troca);

        if(troca == true){
            obj.setItensTrocados(dadosComputador.get("itensTrocados").toString());
        }

        obj.setQuemFez(dadosComputador.get("quemFez").toString());

        Long estadoR = Long.parseLong(dadosComputador.get("estado").toString());
        Estado estado = estadoRepository.findById(estadoR).orElse(null);
        obj.setEstado(estado);

        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }

//    @DeleteMapping(value = "/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id){
//        service.delete(id);
//        return ResponseEntity.noContent().build();
//    }

    @PutMapping(value = "/excluir")
    public ResponseEntity<Computador> excluir(@RequestBody Map<String, String> computador) {
        Long id = Long.parseLong(computador.get("id"));
        Computador computadoExcluido = service.excluir(id);
        return ResponseEntity.ok().body(computadoExcluido);
    }

    @PutMapping(value = "/excluir/cancelar")
    public ResponseEntity<Computador> cancelarExclusao(@RequestBody Map<String, String> computador) {
        Long id = Long.parseLong(computador.get("id"));
        Computador computadorCancelarExclusao = service.cancelarExclusao(id);
        return ResponseEntity.ok().body(computadorCancelarExclusao);
    }

    @PostMapping(value = "/pesquisar")
    public ResponseEntity<List<Computador>> pesquisar(@RequestBody Map<String, String> conteudo) {
        String busca = conteudo.get("conteudo");
        List<Computador> list = service.buscar(busca);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping(value = "/retirar")
    public ResponseEntity<Computador> retirar(@RequestBody Map<String, String> computador) {
        Long id = Long.parseLong(computador.get("id"));
        Date dataRetirada = Date.valueOf(computador.get("dataRetirada"));
        String quemRetirou = computador.get("quemRetirou");
        Computador computadorRetirado = service.retirar(id, dataRetirada, quemRetirou);
        return ResponseEntity.ok().body(computadorRetirado);
    }
}
