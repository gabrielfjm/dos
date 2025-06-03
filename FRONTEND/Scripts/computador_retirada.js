document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const computadorId = queryParams.get('id');

    if (!computadorId) {
        console.log('ID do computador não encontrado.');
        return;
    }

    // Define a data de hoje no campo de data de retirada
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data_retirada_input').value = hoje;
    document.getElementById('data_retirada_input').setAttribute('max', hoje);

    // Carrega as informações do computador
    carregarComputador(computadorId);

    // Adiciona o evento de submit no formulário
    document.getElementById('form_retirada_computador').addEventListener('submit', function (event) {
        event.preventDefault();
        validarFormulario(computadorId);
    });
});

function carregarComputador(id) {
    $.ajax({
        url: `http://localhost:8080/computadores/${id}`,
        method: 'GET',
        success: function(response) {
            document.getElementById('titulo_formulario').innerText = `Patrimônio: ${response.patrimonio}`;
            const dataTermino = new Date(response.dataTermino).toISOString().split('T')[0];
            document.getElementById('data_termino_input').value = dataTermino;
            document.getElementById('data_termino_input').dataset.dataTermino = dataTermino;
        },
        error: function(xhr, status, error) {
            console.log('Erro ao carregar o computador: ' + error);
            alert('Erro ao carregar os dados do computador.');
        }
    });
}

function validarFormulario(computadorId) {
    const dataRetirada = document.getElementById('data_retirada_input').value;
    const quemRetirou = document.getElementById('quem_retirou_input').value;
    const dataTermino = document.getElementById('data_termino_input').dataset.dataTermino;

    let erro = false;

    if (!dataRetirada || new Date(dataRetirada) < new Date(dataTermino)) {
        document.getElementById('erroDataRetirada').innerText = 'A data de retirada deve ser posterior ou igual à data de término.';
        document.getElementById('erroDataRetirada').style.display = 'block';
        document.getElementById('data_retirada_input').style.border = '1px solid red';
        erro = true;
    } else {
        document.getElementById('erroDataRetirada').style.display = 'none';
        document.getElementById('data_retirada_input').style.border = '';
    }

    if (!quemRetirou) {
        document.getElementById('erroQuemRetirou').innerText = 'O nome de quem retirou deve ser informado.';
        document.getElementById('erroQuemRetirou').style.display = 'block';
        document.getElementById('quem_retirou_input').style.border = '1px solid red';
        erro = true;
    } else {
        document.getElementById('erroQuemRetirou').style.display = 'none';
        document.getElementById('quem_retirou_input').style.border = '';
    }

    if (!erro) {
        realizarRetirada(computadorId, dataRetirada, quemRetirou);
    }
}

function realizarRetirada(id, dataRetirada, quemRetirou) {
    const retiradaData = {
        id: id,
        dataRetirada: dataRetirada,
        quemRetirou: quemRetirou
    };

    $.ajax({
        url: 'http://localhost:8080/computadores/retirar',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(retiradaData),
        success: function (response) {
            localStorage.setItem('computadorRetirado', 'true');
            window.location.href = '../html/computadores.html';
        },
        error: function (xhr, status, error) {
            console.log('Erro ao realizar retirada: ' + error);
        }
    });
}
