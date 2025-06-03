package com.dhs.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_origem")
public class Origem implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @JsonIgnore
    @OneToMany(mappedBy = "origem")
    private List<Computador> computadores = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "secretaria_id")
    private Secretaria secretaria;

    public Origem(){
    }

    public Origem(Long id, String descricao, Secretaria secretaria) {
        this.id = id;
        this.descricao = descricao;
        this.secretaria = secretaria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Computador> getComputadores() {
        return computadores;
    }

    public Secretaria getSecretaria() {
        return secretaria;
    }

    public void setSecretaria(Secretaria secretaria) {
        this.secretaria = secretaria;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Origem origem = (Origem) o;
        return Objects.equals(id, origem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
