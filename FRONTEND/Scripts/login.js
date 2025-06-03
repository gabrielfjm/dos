
document.getElementById('email_input').addEventListener('input', function() {
    const emailValido = validarEmail(this.value);
    atualizarErro(this, emailValido, document.getElementById('erroEmail'));
});

document.getElementById('form_login').addEventListener('submit', function(event) {
    // Revalidar todos os campos no submit
    const email = document.getElementById('email_input');
    const senha = document.getElementById('senha_input');

    // Verificar campos vazios
    if (!email.value || !senha.value) {
        event.preventDefault(); // Impede o envio do formulário
        exibirModal();          // Exibe o modal por 5 segundos
        return;
    }

    const emailValido = validarEmail(email.value);

    // Atualizar visuais de erro para todos os campos
    atualizarErro(email, emailValido, document.getElementById('erroEmail'));
    // Se algum campo estiver inválido, impedir o submit
    if (!emailValido) {
        event.preventDefault(); // Impede o envio do formulário
    }
});

// Função para aplicar a borda com base no valor do campo e na validade
function aplicarBorda(campo) {
    const campoNome = campo.id; // Captura o id do campo
    let isValid = true; // Inicializa a variável de validade como verdadeira

    if (campo.value != ""){
        if (campoNome === 'email_input') {
            // Verifica se o email é válido
            isValid = validarEmail(campo.value);
        } 
    }
    
    // Aplica a borda de acordo com a validade
    if (!isValid) {
        campo.style.border = "0.15em solid red"; // Cor vermelha se houver erro
    } else {
        campo.style.border = "0.15em solid #5271ff"; // Cor azul se passar
    }
}

// Adicionando eventos input e blur para todos os campos
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    // Aplica a borda enquanto o usuário digita
    input.addEventListener('input', function() {
        aplicarBorda(this);
    });

    // Remove a borda quando o campo perde o foco
    input.addEventListener('blur', function() {
        const campoNome = this.id;
        let isValid = true;
        if(this.value != ""){
             // Verifica as condições de erro de acordo com o campo
            if (campoNome === 'email_input') {
                isValid = validarEmail(this.value);
            }

            // Se o campo for inválido, mantém a borda vermelha
            if (isValid) {
                removerBorda(this);   
            }
        }else{
            removerBorda(this);
        }
    });

    // Para garantir que a borda de foco seja aplicada
    input.addEventListener('focus', function() {
        if (!this.value) {
            this.style.border = "0.15em solid #5271ff"; // Borda azul se estiver vazio ao focar
        } else {
            aplicarBorda(this); // Aplica a função para verificar a validade ao focar
        }
    });
});

// Evento para alternar a visibilidade da senha principal
document.getElementById('toggleSenha').addEventListener('click', function(event) {
    event.preventDefault();
    togglePasswordVisibility('senha_input', 'eyeIcon');
});

function exibirModalUsuarioCadastrado() {
    const modal = document.getElementById('modal_usuario_cadastrado');
    const progressBar = document.getElementById('progressBar_cadastro');
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

function exibirModalLoginInvalido() {
    const modal = document.getElementById('modal_login_invalido');
    const progressBar = document.getElementById('progressBar_login');
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

function exibirModalLogout() {
    const modal = document.getElementById('modal_login_logout');
    const progressBar = document.getElementById('progressBar_logout');
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

//Verifica se o usuário foi cadastrado
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o Local Storage contém a chave 'usuarioCadastrado'
    if (localStorage.getItem('usuarioCadastrado') === 'true') {
        exibirModalUsuarioCadastrado();
        localStorage.removeItem('usuarioCadastrado');
    }
    if (localStorage.getItem('logout') === 'true') {
        exibirModalLogout();
        localStorage.removeItem('logout');
    }
});