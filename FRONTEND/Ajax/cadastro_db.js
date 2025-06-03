//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (localStorage.getItem('userId')) {
    window.location.href = './computadores.html'; // Redireciona para a página de computadores
}

function emailCadastrado(email, callback) {
    $.ajax({
        url: 'http://localhost:8080/usuarios/email/' + email,
        method: 'GET',
        success: function (response) {
            document.getElementById('email_input').style.border = "0.15em solid red";
            document.getElementById('erroEmail').innerText = "Email já cadastrado!";
            document.getElementById('erroEmail').style.display = 'block';
            callback(false); // Indica que o e-mail já está cadastrado
        },
        error: function (xhr, status, error) {
            document.getElementById('email_input').style.border = "0.15em solid #545454";
            document.getElementById('erroEmail').style.display = 'none';
            callback(true); // Indica que o e-mail não está cadastrado
        }
    });
}

function apelidoCadastrado(apelido, callback) {
    $.ajax({
        url: 'http://localhost:8080/usuarios/apelido/' + apelido,
        method: 'GET',
        success: function (response) {
            document.getElementById('apelido_input').style.border = "0.15em solid red";
            document.getElementById('erroApelido').innerText = "Apelido já cadastrado!";
            document.getElementById('erroApelido').style.display = 'block';
            callback(false); // Indica que o e-mail já está cadastrado
        },
        error: function (xhr, status, error) {
            document.getElementById('apelido_input').style.border = "0.15em solid #545454";
            document.getElementById('erroApelido').style.display = 'none';
            callback(true); // Indica que o e-mail não está cadastrado
        }
    });
}

$('#form_cadastro').submit(function(event) {
    event.preventDefault();
    var nomeCompleto = $('#nome_completo_input').val();
    var apelido = $('#apelido_input').val();
    var email = $('#email_input').val();
    var senha = $('#senha_input').val();
    var senhaConfirmada = $('#confirmar_senha_input').val();

    // Realiza as validações locais
    var nomeValido = validarNome(nomeCompleto);
    var apelidoValido = validarApelido(apelido);
    var emailValido = validarEmail(email);
    var senhaValida = validarSenha(senha);
    var senhasIguais = validarConfirmarSenha(senha, senhaConfirmada);

    if (nomeValido && apelidoValido && emailValido && senhaValida && senhasIguais) {
        // Verifica se o apelido e o e-mail já estão cadastrados antes de enviar o formulário
        apelidoCadastrado(apelido, function(isApelidoAvailable){
            if(isApelidoAvailable){
                emailCadastrado(email, function(isEmailAvailable) {
                    if (isEmailAvailable) {
                        // Envia os dados via POST se o e-mail estiver disponível
                        $.ajax({
                            url: 'http://localhost:8080/usuarios',
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                nomeCompleto: nomeCompleto,
                                apelido: apelido,
                                email: email,
                                senha: senha,
                            }),
                            success: function(response){
                                localStorage.setItem('usuarioCadastrado', 'true');
                                window.location.href="../index.html";
                            },
                            error: function(xhr, status, error) {
                                console.log('Status: ' + status + '\nErro: ' + error);
                            }
                        });
                    }
                });
            }
        });
    } else {
        // Exibe erros de validação
        atualizarErro($('#nome_completo_input'), nomeValido, document.getElementById('erroNome'));
        atualizarErro($('#apelido_input'), apelidoValido, document.getElementById('erroApelido'));
        atualizarErro($('#email_input'), emailValido, document.getElementById('erroEmail'));
        atualizarErro($('#senha_input'), senhaValida, document.getElementById('erroSenha'));
        atualizarErro($('#confirmar_senha_input'), senhasIguais, document.getElementById('erroConfirmarSenha'));
    }
});
