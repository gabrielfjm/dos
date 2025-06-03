//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (!localStorage.getItem('userId')) {
    window.location.href = '../index.html'; // Redireciona para a página de computadores
}

document.addEventListener('DOMContentLoaded', function() {
    // Função para obter o ID da URL
    function getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id'); // Obtém o valor do parâmetro 'id'
    }

    // Função para carregar os dados do computador com base no ID
    function carregarDadosComputador(id) {
        if (!id) {
            console.error('ID não fornecido na URL');
            return;
        }

        // Faz uma requisição GET à API passando o ID do computador
        fetch(`http://localhost:8080/computadores/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados do computador');
                }
                return response.json();
            })
            .then(data => {
                preencherCamposComputador(data); // Chama a função para preencher os campos
            })
            .catch(error => {
                console.error('Erro ao carregar dados do computador:', error);
            });
    }

    // Função para formatar a data
    function formatarData(dataString) {
        if (!dataString) return "Não retirado"; // Caso a data seja nula ou indefinida
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    function preencherCamposComputador(computador) {
        document.getElementById('titulo_formulario').innerHTML = `<strong>PATRIMÔNIO:</strong> ${computador.patrimonio || "Não informado"}`;
        document.getElementById('campo_solicitante').innerHTML = `<strong>SOLICITANTE:</strong> ${computador.solicitante || "Não informado"}`;
        document.getElementById('campo_numeroChamado').innerHTML = `<strong>NÚMERO DO CHAMADO:</strong> ${computador.numeroChamado || "Não informado"}`;
        document.getElementById('campo_origem').innerHTML = `<strong>ORIGEM:</strong> ${computador.origem?.descricao || "Não informado"}`;
        document.getElementById('campo_problemaRelatado').innerHTML = `<strong>PROBLEMA RELATADO:</strong> ${computador.problema || "Não informado"}`;
        document.getElementById('campo_dataEntrada').innerHTML = `<strong>DATA DE ENTRADA:</strong> ${formatarData(computador.dataEntrada)}`;
        document.getElementById('campo_dataTermino').innerHTML = `<strong>DATA DE TÉRMINO:</strong> ${formatarData(computador.dataTermino)}`;
        document.getElementById('campo_processador').innerHTML = `<strong>PROCESSADOR:</strong> ${computador.processador || "Não informado"}`;
        document.getElementById('campo_memoriaRAM').innerHTML = `<strong>MEMÓRIA RAM (GB):</strong> ${computador.memoriaRAM || "Não informado"}`;
        document.getElementById('campo_armazenamento').innerHTML = `<strong>ARMAZENAMENTO (GB):</strong> ${computador.armazenamento || "Não informado"}`;
    
        // Verificar se houve troca de peça
        const trocaDePeca = computador.troca;
        if (trocaDePeca) {
            document.getElementById('campo_troca').innerHTML = `<strong>TROCA DE PEÇA:</strong> Sim`;
            document.getElementById('campo_itensTrocados').style.display = 'block';
            document.getElementById('campo_itensTrocados').innerHTML = `<strong>ITENS TROCADOS:</strong> ${computador.itensTrocados || "Não informado"}`;
        } else {
            document.getElementById('campo_troca').innerHTML = `<strong>TROCA DE PEÇA:</strong> Não`;
            document.getElementById('campo_itensTrocados').style.display = 'none';
        }
    
        document.getElementById('campo_quemFez').innerHTML = `<strong>QUEM FEZ:</strong> ${computador.quemFez || "Não informado"}`;
        document.getElementById('campo_estado').innerHTML = `<strong>ESTADO:</strong> ${computador.estado?.descricao || "Não informado"}`;
    
        // Exibir "Data de Retirada" e "Quem Retirou" apenas se o estado for "Funcionando"
        if (computador.estado?.descricao === "Funcionando") {
            document.getElementById('campo_dataRetirada').style.display = 'block';
            document.getElementById('campo_dataRetirada').innerHTML = `<strong>DATA DE RETIRADA:</strong> ${formatarData(computador.dataRetirada)}`;
            document.getElementById('campo_quemRetirou').style.display = 'block';
            document.getElementById('campo_quemRetirou').innerHTML = `<strong>QUEM RETIROU:</strong> ${computador.quemRetirou || "Não retirado"}`;
        } else {
            document.getElementById('campo_dataRetirada').style.display = 'none';
            document.getElementById('campo_quemRetirou').style.display = 'none';
        }
        
        verificarStatusExclusao(computador);

        verificarRetirada(computador);

    }   

    function verificarStatusExclusao(computador) {
        if (computador.excluido) {
            // Se o computador estiver excluído, mostrar o botão de "Cancelar Exclusão"
            document.getElementById('btn-cancelar-exclusao').style.display = 'inline-block';
            document.getElementById('btn-editar').style.display = 'none';
            document.getElementById('btn-excluir').style.display = 'none';
        } else {
            // Caso contrário, mostrar os botões de "Editar" e "Excluir"
            document.getElementById('btn-cancelar-exclusao').style.display = 'none';
            document.getElementById('btn-editar').style.display = 'inline-block';
            document.getElementById('btn-excluir').style.display = 'inline-block';
        }
    }

    function verificarRetirada(computador) {
        if (computador.dataRetirada != null) {
            document.getElementById('btn-editar').style.display = 'none';
            document.getElementById('btn-excluir').style.display = 'none';
        } else {
            document.getElementById('btn-cancelar-exclusao').style.display = 'none';
            document.getElementById('btn-editar').style.display = 'inline-block';
            document.getElementById('btn-excluir').style.display = 'inline-block';
        }
    }

    // Obtém o ID da URL e carrega os dados do computador
    const idComputador = getIdFromUrl();
    carregarDadosComputador(idComputador);
});

function excluirComputador(id) {
    const computadorData = {
        id: id
    };

    // Faz a requisição POST para a rota /computadores
    $.ajax({
        url: 'http://localhost:8080/computadores/excluir',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(computadorData), // Converte o objeto em JSON
        success: function(response) {
            localStorage.setItem('computadorExcluido', 'true');
            window.location.href = '../html/computadores.html'; // Redireciona para outra página após o sucesso
        },
        error: function(xhr, status, error) {
            console.log('Erro ao excluir computador: ' + error);
        }
    });
}

function cancelarExclusaoComputador(id) {
    const computadorData = {
        id: id
    };

    // Faz a requisição POST para a rota /computadores
    $.ajax({
        url: 'http://localhost:8080/computadores/excluir/cancelar',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(computadorData), // Converte o objeto em JSON
        success: function(response) {
            //localStorage.setItem('computado', 'true');
            window.location.href = '../html/computadores.html'; // Redireciona para outra página após o sucesso
        },
        error: function(xhr, status, error) {
            console.log('Erro ao cancelar exclusão computador: ' + error);
        }
    });
}