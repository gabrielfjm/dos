function exibirModalUsuarioLogado() {
    const modal = document.getElementById('modal_usuario_logado');
    const progressBar = document.getElementById('progressBar_logado');
    const tempoModal = 3000; // Tempo que o modal ficará visível (3 segundos)
    const intervaloAtualizacao = 50; // Atualizar a barrinha a cada 50ms
    let larguraAtual = 0;

    modal.style.display = 'block'; // Mostrar o modal
    progressBar.style.width = '0'; // Reinicia a barrinha

    // Função para atualizar a barrinha de progresso
    const atualizarBarrinha = setInterval(() => {
        larguraAtual += (intervaloAtualizacao / tempoModal) * 100; // Incrementa o progresso
        progressBar.style.width = `${larguraAtual}%`; // Atualiza a largura da barrinha

        // Quando a barrinha chegar a 100%, esconder o modal e parar o intervalo
        if (larguraAtual >= 100) {
            clearInterval(atualizarBarrinha); // Para o intervalo
            modal.style.display = 'none';     // Esconde o modal
            progressBar.style.width = '0';    // Reseta a barrinha para 0% para o próximo uso
        }
    }, intervaloAtualizacao); // Atualiza a cada 50ms

    // Também ocultar o modal após 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, tempoModal);
}

function exibirModalComputadorInserido() {
    const modal = document.getElementById('modal_computador_inserido');
    const progressBar = document.getElementById('progressBar_computador_inserido');
    const tempoModal = 3000; // Tempo que o modal ficará visível (3 segundos)
    const intervaloAtualizacao = 50; // Atualizar a barrinha a cada 50ms
    let larguraAtual = 0;

    modal.style.display = 'block'; // Mostrar o modal
    progressBar.style.width = '0'; // Reinicia a barrinha

    // Função para atualizar a barrinha de progresso
    const atualizarBarrinha = setInterval(() => {
        larguraAtual += (intervaloAtualizacao / tempoModal) * 100; // Incrementa o progresso
        progressBar.style.width = `${larguraAtual}%`; // Atualiza a largura da barrinha

        // Quando a barrinha chegar a 100%, esconder o modal e parar o intervalo
        if (larguraAtual >= 100) {
            clearInterval(atualizarBarrinha); // Para o intervalo
            modal.style.display = 'none';     // Esconde o modal
            progressBar.style.width = '0';    // Reseta a barrinha para 0% para o próximo uso
        }
    }, intervaloAtualizacao); // Atualiza a cada 50ms

    // Também ocultar o modal após 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, tempoModal);
}

function exibirModalComputadorRetirado() {
    const modal = document.getElementById('modal_computador_retirado');
    const progressBar = document.getElementById('progressBar_computador_retirado');
    const tempoModal = 3000; // Tempo que o modal ficará visível (3 segundos)
    const intervaloAtualizacao = 50; // Atualizar a barrinha a cada 50ms
    let larguraAtual = 0;

    modal.style.display = 'block'; // Mostrar o modal
    progressBar.style.width = '0'; // Reinicia a barrinha

    // Função para atualizar a barrinha de progresso
    const atualizarBarrinha = setInterval(() => {
        larguraAtual += (intervaloAtualizacao / tempoModal) * 100; // Incrementa o progresso
        progressBar.style.width = `${larguraAtual}%`; // Atualiza a largura da barrinha

        // Quando a barrinha chegar a 100%, esconder o modal e parar o intervalo
        if (larguraAtual >= 100) {
            clearInterval(atualizarBarrinha); // Para o intervalo
            modal.style.display = 'none';     // Esconde o modal
            progressBar.style.width = '0';    // Reseta a barrinha para 0% para o próximo uso
        }
    }, intervaloAtualizacao); // Atualiza a cada 50ms

    // Também ocultar o modal após 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, tempoModal);
}

function exibirModalComputadorExcluido() {
    const modal = document.getElementById('modal_computador_excluido');
    const progressBar = document.getElementById('progressBar_computador_excluido');
    const tempoModal = 3000; // Tempo que o modal ficará visível (3 segundos)
    const intervaloAtualizacao = 50; // Atualizar a barrinha a cada 50ms
    let larguraAtual = 0;

    modal.style.display = 'block'; // Mostrar o modal
    progressBar.style.width = '0'; // Reinicia a barrinha

    // Função para atualizar a barrinha de progresso
    const atualizarBarrinha = setInterval(() => {
        larguraAtual += (intervaloAtualizacao / tempoModal) * 100; // Incrementa o progresso
        progressBar.style.width = `${larguraAtual}%`; // Atualiza a largura da barrinha

        // Quando a barrinha chegar a 100%, esconder o modal e parar o intervalo
        if (larguraAtual >= 100) {
            clearInterval(atualizarBarrinha); // Para o intervalo
            modal.style.display = 'none';     // Esconde o modal
            progressBar.style.width = '0';    // Reseta a barrinha para 0% para o próximo uso
        }
    }, intervaloAtualizacao); // Atualiza a cada 50ms

    // Também ocultar o modal após 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, tempoModal);
}

//Verifica se o usuário realizou login
document.addEventListener('DOMContentLoaded', function() {
    
    if (window.location.href.includes('computadores')) {
        document.getElementById('btn_computadores').classList.add('active');
    }

    // Verifica se o Local Storage contém a chave 'usuarioCadastrado'
    if (localStorage.getItem('loginRealizado') === 'true') {
        exibirModalUsuarioLogado();
        localStorage.removeItem('loginRealizado');
        localStorage.setItem('logout', 'true');
    }

    if (localStorage.getItem('computadorInserido') === 'true') {
        exibirModalComputadorInserido();
        localStorage.removeItem('computadorInserido');
    }

    if (localStorage.getItem('computadorAtualizado') === 'true') {   
        //exibirModalComputadorAtualizado();
        localStorage.removeItem('computadorAtualizado');
        window.location.reload();
    }

    if (localStorage.getItem('computadorRetirado') === 'true') {
        exibirModalComputadorRetirado();
        localStorage.removeItem('computadorRetirado');
    }

    if (localStorage.getItem('computadorExcluido') === 'true') {
        exibirModalComputadorExcluido();
        localStorage.removeItem('computadorExcluido');
    }
});

document.getElementById('btn_computadores').addEventListener('click', function() {
    location.reload();
});

//Função de pesquisar
document.getElementById('btnPesquisar').addEventListener('click', function() {
    buscar();
});

//Função de adicionar computador
document.getElementById('btnAdicionarComputador').addEventListener('click', function() {
    window.location.href = './cadastro_computador.html';
});

document.getElementById('pesquisaComputadores').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscar();
    }
});
