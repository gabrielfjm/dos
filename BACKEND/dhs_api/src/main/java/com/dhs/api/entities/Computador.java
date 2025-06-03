package com.dhs.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "tb_computador")
public class Computador implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patrimonio;
    private String solicitante;
    private String numeroChamado;
    private String problema;
    private Date dataEntrada;
    private Date dataTermino;
    private int memoriaRAM;
    private int armazenamento;
    private String processador;
    private boolean troca;
    private String itensTrocados;
    private Date dataRetirada;
    private String quemRetirou;
    private String quemFez;

    @ManyToOne
    @JoinColumn(name = "origem_id")
    private Origem origem;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private Estado estado;

    private boolean excluido;

    public Computador(){
    }

    public Computador(Long id, String patrimonio, String solicitante, String numeroChamado, String problema, Date dataEntrada, Date dataTermino, int memoriaRAM, int armazenamento, String processador, boolean troca, String itensTrocados, Date dataRetirada, String quemRetirou, String quemFez, Origem origem, Estado estado) {
        this.id = id;
        this.patrimonio = patrimonio;
        this.solicitante = solicitante;
        this.numeroChamado = numeroChamado;
        this.problema = problema;
        this.dataEntrada = dataEntrada;
        this.dataTermino = dataTermino;
        this.memoriaRAM = memoriaRAM;
        this.armazenamento = armazenamento;
        this.processador = processador;
        this.troca = troca;
        this.itensTrocados = itensTrocados;
        this.dataRetirada = dataRetirada;
        this.quemRetirou = quemRetirou;
        this.quemFez = quemFez;
        this.origem = origem;
        this.estado = estado;
        this.excluido = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatrimonio() {
        return patrimonio;
    }

    public void setPatrimonio(String patrimonio) {
        this.patrimonio = patrimonio;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public String getNumeroChamado() {
        return numeroChamado;
    }

    public void setNumeroChamado(String numeroChamado) {
        this.numeroChamado = numeroChamado;
    }

    public String getProblema() {
        return problema;
    }

    public void setProblema(String problema) {
        this.problema = problema;
    }

    public Date getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(Date dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Date getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(Date dataTermino) {
        this.dataTermino = dataTermino;
    }

    public int getMemoriaRAM() {
        return memoriaRAM;
    }

    public void setMemoriaRAM(int memoriaRAM) {
        this.memoriaRAM = memoriaRAM;
    }

    public int getArmazenamento() {
        return armazenamento;
    }

    public void setArmazenamento(int armazenamento) {
        this.armazenamento = armazenamento;
    }

    public String getProcessador() {
        return processador;
    }

    public void setProcessador(String processador) {
        this.processador = processador;
    }

    public boolean isTroca() {
        return troca;
    }

    public void setTroca(boolean troca) {
        this.troca = troca;
    }

    public String getItensTrocados() {
        return itensTrocados;
    }

    public void setItensTrocados(String itensTrocados) {
        this.itensTrocados = itensTrocados;
    }

    public Date getDataRetirada() {
        return dataRetirada;
    }

    public void setDataRetirada(Date dataRetirada) {
        this.dataRetirada = dataRetirada;
    }

    public String getQuemRetirou() {
        return quemRetirou;
    }

    public void setQuemRetirou(String quemRetirou) {
        this.quemRetirou = quemRetirou;
    }

    public String getQuemFez() {
        return quemFez;
    }

    public void setQuemFez(String quemFez) {
        this.quemFez = quemFez;
    }

    public Origem getOrigem() {
        return origem;
    }

    public void setOrigem(Origem origem) {
        this.origem = origem;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public boolean isExcluido() {
        return excluido;
    }

    public void setExcluido(boolean excluido) {
        this.excluido = excluido;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Computador that = (Computador) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
