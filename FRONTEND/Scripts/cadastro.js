
// Adicionando eventos de input para validação em tempo real
document.getElementById('nome_completo_input').addEventListener('input', function() {
    const nomeValido = validarNome(this.value);
    atualizarErro(this, nomeValido, document.getElementById('erroNome'));
});

document.getElementById('apelido_input').addEventListener('input', function() {
    const apelidoValido = validarApelido(this.value);
    atualizarErro(this, apelidoValido, document.getElementById('erroApelido'));
});

document.getElementById('email_input').addEventListener('input', function() {
    const emailValido = validarEmail(this.value);
    atualizarErro(this, emailValido, document.getElementById('erroEmail'));
});

document.getElementById('senha_input').addEventListener('input', function() {
    const senhaValida = validarSenha(this.value);
    atualizarErro(this, senhaValida, document.getElementById('erroSenha'));
});

document.getElementById('confirmar_senha_input').addEventListener('input', function() {
    const senha = document.getElementById('senha_input').value;
    const confirmarSenha = this.value;
    const senhasIguais = validarConfirmarSenha(senha, confirmarSenha);
    atualizarErro(this, senhasIguais, document.getElementById('erroConfirmarSenha'));
});

document.getElementById('confirmar_senha_input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('botao_cadastro').click(); // Simula um clique no botão de cadastro
    }
});

// Aplicando a função de validação em todos os campos no evento blur
document.getElementById('nome_completo_input').addEventListener('blur', function() {
    const isValid = validarNome(this.value);
    aplicarBorda(this);
});

document.getElementById('apelido_input').addEventListener('blur', function() {
    const isValid = validarApelido(this.value);
    aplicarBorda(this);
});

document.getElementById('email_input').addEventListener('blur', function() {
    const isValid = validarEmail(this.value);
    aplicarBorda(this);
});

document.getElementById('senha_input').addEventListener('blur', function() {
    const isValid = validarSenha(this.value);
    aplicarBorda(this);
});

document.getElementById('confirmar_senha_input').addEventListener('blur', function() {
    const isValid = validarConfirmarSenha(this.value);
    aplicarBorda(this);
});

// Prevenir envio caso haja erro
document.getElementById('form_cadastro').addEventListener('submit', function(event) {
    // Revalidar todos os campos no submit
    const nomeCompleto = document.getElementById('nome_completo_input');
    const apelido = document.getElementById('apelido_input');
    const email = document.getElementById('email_input');
    const senha = document.getElementById('senha_input');
    const confirmarSenha = document.getElementById('confirmar_senha_input');

    // Verificar campos vazios
    if (!nomeCompleto.value || !apelido.value || !email.value || !senha.value || !confirmarSenha.value) {
        event.preventDefault(); // Impede o envio do formulário
        exibirModal();          // Exibe o modal por 5 segundos
        return;
    }

    const nomeValido = validarNome(nomeCompleto.value);
    const apelidoValido = validarUsuario(apelido.value);
    const emailValido = validarEmail(email.value);
    const senhaValida = validarSenha(senha.value);
    const senhasIguais = validarConfirmarSenha(senha.value, confirmarSenha.value);

    // Atualizar visuais de erro para todos os campos
    atualizarErro(nomeCompleto, nomeValido, document.getElementById('erroNome'));
    atualizarErro(apelido, apelidoValido, document.getElementById('erroApelido'));
    atualizarErro(email, emailValido, document.getElementById('erroEmail'));
    atualizarErro(senha, senhaValida, document.getElementById('erroSenha'));
    atualizarErro(confirmarSenha, senhasIguais, document.getElementById('erroConfirmarSenha'));

    // Se algum campo estiver inválido, impedir o submit
    if (!nomeValido || !apelidoValido || !emailValido || !senhaValida || !senhasIguais) {
        event.preventDefault(); // Impede o envio do formulário
    }
});

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
            if (campoNome === 'nome_completo_input') {
                isValid = validarNome(campo.value);
            } else if (campoNome === 'apelido_input') {
                isValid = validarApelido(campo.value);
            } else if (campoNome === 'email_input') {
                isValid = validarEmail(campo.value);
            } else if (campoNome === 'senha_input') {
                isValid = validarSenha(campo.value);
            } else if (campoNome === 'confirmar_senha_input') {
                const senha = document.getElementById('senha_input').value;
                isValid = validarConfirmarSenha(senha, campo.value);
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
    togglePasswordVisibility('senha_input', 'eyeIconSenha');
});

// Evento para alternar a visibilidade da senha de confirmação
document.getElementById('toggleConfirmarSenha').addEventListener('click', function(event) {
    event.preventDefault();
    togglePasswordVisibility('confirmar_senha_input', 'eyeIconConfirmarSenha');
});
