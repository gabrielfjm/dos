# DOS - Sistema de Gerenciamento de Manutenção e Estoque

## Visão Geral

O **DOS (Departamento de Manutenção e Sistemas)** é um sistema web, atualmente em produção, desenvolvido para atender a uma necessidade real do departamento de manutenção e sistemas da prefeitura municipal. O principal objetivo do sistema é oferecer um controle eficiente e simplificado do fluxo de entrada e saída de computadores destinados à manutenção, além de gerenciar o estoque de peças e componentes. Esta solução visa promover maior organização, rastreabilidade dos processos e otimização dos recursos.

## Contexto e Motivação

Durante um estágio na prefeitura municipal, identificou-se a necessidade de modernizar e otimizar a gestão dos equipamentos de informática que passavam por manutenção, bem como o controle do inventário de peças. O DOS foi concebido para solucionar essa demanda concreta, substituindo controles manuais ou descentralizados por uma plataforma digital centralizada e de fácil acesso.

## Principais Funcionalidades

O sistema oferece as seguintes funcionalidades principais:

* **Controle de Fluxo de Equipamentos:**
    * Registro de entrada de computadores para manutenção.
    * Acompanhamento do status de cada equipamento (ex: em diagnóstico, aguardando peça, em reparo, finalizado).
    * Registro de saída de computadores após a manutenção.
* **Gerenciamento de Estoque:**
    * Cadastro e controle de itens do estoque (peças, componentes, periféricos).
    * Registro de entrada e saída de itens do estoque.
    * Visualização do quantitativo atual de cada item.
* **Rastreabilidade:**
    * Histórico completo de manutenções por equipamento.
    * Rastreabilidade de quais peças do estoque foram utilizadas em quais manutenções.
* **Geração de Relatórios:**
    * Emissão de relatórios em formato PDF, contendo informações sobre:
        * Equipamentos em manutenção.
        * Histórico de manutenções.
        * Status do estoque.
        * Outras informações gerenciais relevantes.

## Tecnologias Utilizadas

O desenvolvimento do sistema DOS empregou as seguintes tecnologias:

* **Back-End:**
    * **Java:** Linguagem de programação principal para a lógica de negócios.
    * **Spring Framework:** Framework para desenvolvimento de aplicações Java robustas e escaláveis (incluindo Spring Boot, Spring MVC, Spring Data, etc., conforme aplicável).
    * **MySQL:** Sistema de gerenciamento de banco de dados relacional para persistência dos dados.

* **Front-End:**
    * **HTML:** Linguagem de marcação para estruturação das páginas web.
    * **CSS:** Linguagem de estilização para o design e apresentação visual das páginas.

* **Integração e Comunicação (Client-Side):**
    * **JavaScript:** Linguagem de script para interatividade e dinamismo no lado do cliente.
    * **Ajax (Asynchronous JavaScript and XML):** Técnica para realizar requisições assíncronas ao servidor, permitindo atualizações parciais da página sem a necessidade de recarregamento completo, proporcionando uma experiência de usuário mais fluida.

## Status do Projeto

Sistema finalizado e aprovado para o departamento.
