// Funções de validação
const regexCampoVazio = /^\s*$/;
const regexNome = /^[a-zA-Zà-úÀ-Ú~][a-zA-Zà-úÀ-Ú\s~]*$/;
const regexApelido = /^[a-zA-Z0-9]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexSenha = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function validarCampoVazio(campo){
    return !regexCampoVazio.test(campo)
}

function validarNome(nome) {
    return regexNome.test(nome);
}

function validarApelido(apelido) {
    return regexApelido.test(apelido);
}

function validarEmail(email) {
    return regexEmail.test(email);
}

function validarSenha(senha) {
    return regexSenha.test(senha);
}

function validarConfirmarSenha(senha, confirmarSenha) {
    return senha === confirmarSenha;
}

// Funções para mostrar/ocultar erros e definir borda vermelha
function atualizarErro(campo, valido, spanErro) {
    if (!valido && campo.value !== "") {
        campo.style.border = "0.15em solid red";
        spanErro.style.display = 'block';
    } else {
        campo.style.border = "0.15em solid #545454";
        spanErro.style.display = 'none';
    }
}

// Função para remover a borda ao sair do campo
function removerBorda(campo) {
    campo.style.border = ""; // Remove a borda colorida
}

// Função para exibir modal quando campos estão vazios
function exibirModal() {
    const modal = document.getElementById('modal');
    const progressBar = document.getElementById('progressBar');
    const tempoModal = 3000; // Tempo que o modal ficará visível (5 segundos)
    const intervaloAtualizacao = 100; // Atualizar a barrinha a cada 100ms
    let larguraAtual = 0;

    modal.style.display = 'block'; // Mostrar o modal

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
    }, intervaloAtualizacao); // Atualiza a cada 100ms

    // Também ocultar o modal após 5 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, tempoModal);
}

function exibirModalComputadorAtualizado() {
    const modal = document.getElementById('modal_computador_atualizado');
    const progressBar = document.getElementById('progressBar_computador_atualizado');
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

// Função para alternar a visibilidade de senha
function togglePasswordVisibility(inputId, eyeIconId) {
    const senhaInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);

    // Alterna entre 'password' e 'text'
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text'; // Mostra a senha
        eyeIcon.classList.remove('fa-eye'); // Remove o ícone de olho aberto
        eyeIcon.classList.add('fa-eye-slash'); // Adiciona o ícone de olho fechado
    } else {
        senhaInput.type = 'password'; // Esconde a senha
        eyeIcon.classList.remove('fa-eye-slash'); // Remove o ícone de olho fechado
        eyeIcon.classList.add('fa-eye'); // Adiciona o ícone de olho aberto
    }
}

//Função de LOGOUT
document.getElementById('btn_logout').addEventListener('click', function() {
    localStorage.removeItem('userId'); // Remove o ID do usuário
    window.location.href = '../index.html'; // Redireciona para a página de login
});

document.getElementById('btn_computadores').addEventListener('click', function() {
    window.location.href = './computadores.html'; // Redireciona para a página de login
});

//Função de LOGOUT
document.getElementById('botao_voltar').addEventListener('click', function() {
    window.history.back();
});

// Função para validar selects e remover erros quando uma opção válida for selecionada
function validarSelect(campo, erroId) {
    campo.addEventListener('change', function() {
        if (campo.value !== "") {
            document.getElementById(erroId).style.display = 'none';
            campo.style.border = ""; // Remove a borda vermelha
        } else {
            document.getElementById(erroId).innerText = 'Selecione uma opção válida.';
            document.getElementById(erroId).style.display = 'block';
            campo.style.border = "1px solid red";
        }
    });
}

// Função para validar campos de texto enquanto o usuário digita
function validarCampo(campo, erroId) {
    campo.addEventListener('input', function() {
        if (!validarCampoVazio(campo.value)) {
            document.getElementById(erroId).innerText = 'Este campo é obrigatório.';
            document.getElementById(erroId).style.display = 'block';
            campo.style.border = "1px solid red";
        } else {
            document.getElementById(erroId).style.display = 'none';
            campo.style.border = ""; // Remove a borda vermelha
        }
    });
}

function validarCampoNumerico(campo, erroId) {
    campo.addEventListener('input', function() {
        if (!validarCampoVazio(campo.value)) {
            document.getElementById(erroId).innerText = 'Este campo é obrigatório.';
            document.getElementById(erroId).style.display = 'block';
            campo.style.border = "1px solid red";
        }else if(campo.value <= 0){
            document.getElementById(erroId).innerText = 'O número deve ser um valor positivo (maior que 0).';
            document.getElementById(erroId).style.display = 'block';
            campo.style.border = "1px solid red";
        }else {
            document.getElementById(erroId).style.display = 'none';
            campo.style.border = ""; // Remove a borda vermelha
        }
    });
}

// Verificação dos campos obrigatórios
function validarCampoAntesSubmit(campo, erroId) {
    if (campo.value === "") {
        document.getElementById(erroId).innerText = 'Este campo é obrigatório.';
        document.getElementById(erroId).style.display = 'block';
        campo.style.border = "1px solid red";
        formValido = false;
    } else {
        document.getElementById(erroId).style.display = 'none';
        campo.style.border = ""; // Remove a borda vermelha
    }
}

function validarCampoNumericoAntesSubmit(campo, erroId) {
    if (campo.value === "") {
        document.getElementById(erroId).innerText = 'Este campo é obrigatório.';
        document.getElementById(erroId).style.display = 'block';
        campo.style.border = "1px solid red";
        formValido = false;
    }else if(campo.value <= 0){
        document.getElementById(erroId).innerText = 'O número deve ser um valor positivo (maior que 0).';
        document.getElementById(erroId).style.display = 'block';
        campo.style.border = "1px solid red";
        formValido = false;
    }else {
        document.getElementById(erroId).style.display = 'none';
        campo.style.border = ""; // Remove a borda vermelha
    }
}

function validarSelectAntesSubmit(select, erroId) {
    if (select.value === "") {
        document.getElementById(erroId).innerText = 'Selecione uma opção válida.';
        document.getElementById(erroId).style.display = 'block';
        select.style.border = "1px solid red";
        formValido = false;
    } else {
        document.getElementById(erroId).style.display = 'none';
        select.style.border = ""; // Remove a borda vermelha
    }
}

// Verifica se o usuário está na página de computadores pela URL
if (window.location.href.includes('computadores.html')) {
    document.getElementById('btn_computadores').classList.add('active');
}