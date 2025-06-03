//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (!localStorage.getItem('userId')) {
    window.location.href = '../index.html'; // Redireciona para a página de computadores
}

$(document).ready(function() {
    carregaComputadores();
});

function carregaComputadores() {
    $.ajax({
        url: 'http://localhost:8080/computadores', // URL da API
        method: 'GET',
        success: function(response) {
            // Limpa o conteúdo do tbody da tabela, mas mantém o cabeçalho
            $('#tabela_computadores').empty();

            // Filtra os computadores que não estão excluídos
            const computadoresAtivos = response.filter(computador => !computador.excluido);

            // Verifica se a resposta está vazia ou se todos os computadores estão excluídos
            if (computadoresAtivos.length === 0) {
                // Se não houver computadores cadastrados ou todos forem excluídos, adiciona uma linha de aviso
                var emptyRow = `
                    <tr>
                        <td colspan="8" style="text-align: center; font-weight: bold;">Nenhum computador foi encontrado.</td>
                    </tr>
                `;
                $('#tabela_computadores').append(emptyRow);
            } else {
                // Itera sobre cada computador não excluído retornado do banco e adiciona uma linha na tabela
                computadoresAtivos.forEach(function(computador) {
                    var dataRetirada = computador.dataRetirada ? new Date(computador.dataRetirada).toLocaleDateString() : "-";
                    
                    // Verifica se o computador já foi retirado e ajusta o conteúdo de ações
                    var acoes = computador.dataRetirada
                    ? `<span style="font-weight: bold; color: grey;">Já retirado</span>`
                    : `
                        <button class="btn-editar" onclick="editarComputador(${computador.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${computador.estado.descricao != "Baixa" ? `
                            <button class="btn-entrega" onclick="redirecionarEntrega(${computador.id})">
                                <i class="fas fa-box"></i>
                            </button>` : ''}
                    `;
                    
                    var rowHTML = `
                        <tr>
                            <td>
                                <a href="./computador_view.html?id=${computador.id}">
                                    <i class="fas fa-search"></i>
                                </a>
                            </td> <!-- Nova coluna com o ícone de consulta -->
                            <td>${computador.patrimonio}</td>
                            <td>${computador.numeroChamado}</td>
                            <td>${computador.origem.descricao}</td>
                            <td>${new Date(computador.dataEntrada).toLocaleDateString()}</td>
                            <td>${dataRetirada}</td>
                            <td>${computador.estado.descricao}</td>
                            <td>${acoes}</td>
                        </tr>
                    `;
                    $('#tabela_computadores').append(rowHTML);
                });
            }
        },
        error: function(xhr, status, error) {
            console.log('Status: ' + status + '\nErro: ' + error);
        }
    });
}

// Função para redirecionar para a página de edição com base no ID
function editarComputador(id) {
    window.location.href = `../html/editar_computador.html?id=${id}`;
}

// Função para redirecionar para a tela de entrega com base no ID
function redirecionarEntrega(id) {
    window.location.href = `../html/computador_retirada.html?id=${id}`;
}

function buscar() {
    var conteudo = $('#pesquisaComputadores').val();
    if (conteudo == "" || conteudo.trim() === "") {
        carregaComputadores();
    } else {
        $.ajax({
            url: 'http://localhost:8080/computadores/pesquisar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ conteudo: conteudo }),
            success: function(response) {
                // Limpa o conteúdo do tbody da tabela, mas mantém o cabeçalho
                $('#tabela_computadores').empty();

                // Filtra os computadores que não estão excluídos
                const computadoresAtivos = response.filter(computador => !computador.excluido);

                // Verifica se a resposta está vazia ou se todos os computadores estão excluídos
                if (computadoresAtivos.length === 0) {
                    // Se não houver computadores cadastrados ou todos forem excluídos, adiciona uma linha de aviso
                    var emptyRow = `
                        <tr>
                            <td colspan="8" style="text-align: center; font-weight: bold;">Nenhum computador foi encontrado.</td>
                        </tr>
                    `;
                    $('#tabela_computadores').append(emptyRow);
                } else {
                    // Itera sobre cada computador não excluído retornado do banco e adiciona uma linha na tabela
                    computadoresAtivos.forEach(function(computador) {
                        var dataRetirada = computador.dataRetirada ? new Date(computador.dataRetirada).toLocaleDateString() : "-";
                        
                        // Verifica se o computador já foi retirado e ajusta o conteúdo de ações
                        var acoes = computador.dataRetirada
                            ? `<span style="font-weight: bold; color: grey;">Já retirado</span>`
                            : `
                                <button class="btn-editar" onclick="editarComputador(${computador.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                ${computador.estado.descricao != "Baixa" ? `
                                    <button class="btn-entrega" onclick="redirecionarEntrega(${computador.id})">
                                        <i class="fas fa-box"></i>
                                    </button>` : ''}
                              `;

                        var rowHTML = `
                            <tr>
                                <td>
                                    <a href="./computador_view.html?id=${computador.id}">
                                        <i class="fas fa-search"></i>
                                    </a>
                                </td>
                                <td>${computador.patrimonio}</td>
                                <td>${computador.numeroChamado}</td>
                                <td>${computador.origem.descricao}</td>
                                <td>${new Date(computador.dataEntrada).toLocaleDateString()}</td>
                                <td>${dataRetirada}</td>
                                <td>${computador.estado.descricao}</td>
                                <td>${acoes}</td>
                            </tr>
                        `;
                        $('#tabela_computadores').append(rowHTML);
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log('Status: ' + status + '\nErro: ' + error);
            }
        });
    }
}
