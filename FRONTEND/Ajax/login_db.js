//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (localStorage.getItem('userId')) {
    window.location.href = './html/computadores.html'; // Redireciona para a página de computadores
}

$(document).ready(function() {
    $('#form_login').submit(function(event) {
        event.preventDefault();
        var email = $('#email_input').val();
        var senha = $('#senha_input').val();

        var emailValido = validarEmail(email);
        var senhaValida = validarCampoVazio(senha);

        if(emailValido && senhaValida){
            $.ajax({
                url: 'http://localhost:8080/usuarios/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    senha: senha
                }),
                success: function(response) {
                    if (response.success) {
                        console.log(response);
                        localStorage.setItem('userId', response.userId);
                        localStorage.setItem('loginRealizado', 'true');
                        window.location.href = '../html/computadores.html';
                    } else {
                        
                    }
                },
                error: function(xhr, status, error) {
                    exibirModalLoginInvalido();
                    console.log('Status: ' + status + '\nErro: ' + error);
                }
            });
        }
    });
});