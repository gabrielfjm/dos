//Verifica se o usuário realizou login
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('computadorAtualizado') === 'true') {
        localStorage.removeItem('computadorAtualizado');
        window.location.reload();
    }
});

//Função de editar computador
document.getElementById('btn-editar').addEventListener('click', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.location.href = `../html/editar_computador.html?id=${id}`
});

// Abrir o modal ao clicar em "Excluir"
document.getElementById('btn-excluir').addEventListener('click', function() {
    document.getElementById('alertaConfirmacao').style.display = 'flex';
    document.body.classList.add('alerta-open'); // Impede o scroll da página principal
});

// Fechar o modal ao clicar no "Não" ou no "X"
document.getElementById('cancelarAlerta').addEventListener('click', function() {
    document.getElementById('alertaConfirmacao').style.display = 'none';
    document.body.classList.remove('alerta-open'); // volta o scroll da página principal
});

// Função para excluir o computador ao clicar em "Sim"
document.getElementById('confirmarAlerta').addEventListener('click', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Faz a requisição de exclusão
    if (id) {
        excluirComputador(id);; // Passa o ID correto para a função
    } else {
        console.error("ID não encontrado na URL.");
    }   
   
});

// Abrir o modal ao clicar em "Excluir"
document.getElementById('btn-cancelar-exclusao').addEventListener('click', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        cancelarExclusaoComputador(id); // Passa o ID correto para a função
    } else {
        console.error("ID não encontrado na URL.");
    }
});


