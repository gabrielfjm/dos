//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (!localStorage.getItem('userId')) {
    window.location.href = '../index.html'; // Redireciona para a página de computadores
}

// Função para carregar as origens no select box, separadas por secretarias
function carregarOrigens(origemIdSelecionada) {
    $.ajax({
        url: 'http://localhost:8080/origens', // A URL que retorna o JSON
        method: 'GET',
        success: function(response) {
            var selectOrigem = document.getElementById('origem_input');
            selectOrigem.innerHTML = ''; // Limpa qualquer opção existente

            // Um objeto para agrupar as opções por secretaria
            var secretarias = {};

            // Adiciona um valor padrão "Selecione uma origem", desabilitado
            var optionPadrao = document.createElement('option');
            optionPadrao.value = '';
            optionPadrao.text = 'Selecione uma origem';
            optionPadrao.disabled = true; // Desabilita a opção
            optionPadrao.selected = true; // Define como selecionada por padrão
            selectOrigem.appendChild(optionPadrao);

            // Itera sobre as origens recebidas e organiza por secretaria
            response.forEach(function(origem) {
                var secretariaDescricao = origem.secretaria.descricao;

                // Verifica se já existe um grupo para essa secretaria, se não, cria
                if (!secretarias[secretariaDescricao]) {
                    secretarias[secretariaDescricao] = document.createElement('optgroup');
                    secretarias[secretariaDescricao].label = secretariaDescricao;
                    selectOrigem.appendChild(secretarias[secretariaDescricao]);
                }

                // Cria a opção da origem e adiciona ao grupo da secretaria correspondente
                var option = document.createElement('option');
                option.value = origem.id;
                option.text = origem.descricao;

                // Verifica se essa opção deve ser a selecionada
                if (origem.id === origemIdSelecionada) {
                    option.selected = true;
                }

                secretarias[secretariaDescricao].appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.log('Erro ao carregar origens: ' + error);
        }
    });
}

// Função para carregar os estados no select box
function carregarEstados(estadoIdSelecionado) {
    $.ajax({
        url: 'http://localhost:8080/estados', // A URL que retorna o JSON dos estados
        method: 'GET',
        success: function(response) {
            var selectEstado = document.getElementById('estado_input');
            selectEstado.innerHTML = ''; // Limpa qualquer opção existente

            // Adiciona um valor padrão "Selecione um estado", desabilitado
            var optionPadrao = document.createElement('option');
            optionPadrao.value = '';
            optionPadrao.text = 'Selecione um estado';
            optionPadrao.disabled = true; // Desabilita a opção
            optionPadrao.selected = true; // Define como selecionada por padrão
            selectEstado.appendChild(optionPadrao);

            // Itera sobre os estados recebidos e adiciona as opções ao select
            response.forEach(function(estado) {
                var option = document.createElement('option');
                option.value = estado.id;
                option.text = estado.descricao;
                
                // Verifica se essa opção deve ser a selecionada
                if (estado.id === estadoIdSelecionado) {
                    option.selected = true;
                }

                selectEstado.appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.log('Erro ao carregar estados: ' + error);
        }
    });
}

function carregarComputador(id) {
    $.ajax({
        url: 'http://localhost:8080/computadores/' + id,
        method: 'GET',
        success: function (response) {
            // Preencher os campos com os dados recebidos do JSON
            document.getElementById('titulo_formulario').innerText = `Patrimônio: ${response.patrimonio}`;
            $('#solicitante_input').val(response.solicitante);
            $('#numero_chamado_input').val(response.numeroChamado);
            $('#problema_input').val(response.problema);
            $('#data_entrada_input').val(new Date(response.dataEntrada).toISOString().split('T')[0]);
            $('#data_termino_input').val(new Date(response.dataTermino).toISOString().split('T')[0]);
            $('#memoria_ram_input').val(response.memoriaRAM);
            $('#armazenamento_input').val(response.armazenamento);
            $('#processador_input').val(response.processador);
            $('#quem_fez_input').val(response.quemFez);
            
            // Preencher o select de origem
            carregarOrigens(response.origem.id);
            
            // Preencher o select de estado
            carregarEstados(response.estado.id);

            if (response.dataRetirada) {
                const estadoSelect = document.getElementById('estado_input');
                estadoSelect.disabled = true; // Desabilita o campo
            }            

            // Preencher o select de troca (sim/não)
            if (response.troca) {
                $('#troca_input').val('sim');
                $('#itens_trocados_container').show();
                $('#itens_trocados_input').val(response.itensTrocados);
            } else {
                $('#troca_input').val('nao');
                $('#itens_trocados_container').hide();
            }

        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar computador: ', error);
        }
    });
}

// Carregar os dados ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        carregarComputador(id);
    }
});


document.getElementById('form_editar_computador').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const solicitante = document.getElementById('solicitante_input').value;
    const numeroChamado = document.getElementById('numero_chamado_input').value;
    const origem = document.getElementById('origem_input').value;
    const problema = document.getElementById('problema_input').value;
    const dataEntrada = document.getElementById('data_entrada_input').value;
    const dataTermino = document.getElementById('data_termino_input').value;
    const memoriaRAM = document.getElementById('memoria_ram_input').value;
    const armazenamento = document.getElementById('armazenamento_input').value;
    const processador = document.getElementById('processador_input').value;
    const troca = document.getElementById('troca_input').value;
    const itensTrocados = document.getElementById('itens_trocados_input').value;
    const quemFez = document.getElementById('quem_fez_input').value;
    const estado = document.getElementById('estado_input').value;

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'), 10); // Corrige a obtenção do ID da URL

    const dataEntradaObj = new Date(dataEntrada);
    const dataTerminoObj = new Date(dataTermino);

    let formValido = true;

    // Verifica se a data de entrada é maior que a data de término
    validarCampoAntesSubmit(document.getElementById('solicitante_input'), 'erroSolicitante');
    validarCampoNumericoAntesSubmit(document.getElementById('numero_chamado_input'), 'erroNumeroChamado');
    validarCampoAntesSubmit(document.getElementById('problema_input'), 'erroProblema');
    validarCampoNumericoAntesSubmit(document.getElementById('memoria_ram_input'), 'erroMemoriaRAM');
    validarCampoNumericoAntesSubmit(document.getElementById('armazenamento_input'), 'erroArmazenamento');
    validarCampoAntesSubmit(document.getElementById('processador_input'), 'erroProcessador');
    validarCampoAntesSubmit(document.getElementById('quem_fez_input'), 'erroQuemFez');    

    if (dataEntradaObj > dataTerminoObj) {
        document.getElementById('erroDataEntrada').innerText = 'A data de entrada não pode ser superior à data de término.';
        document.getElementById('erroDataEntrada').style.display = 'block';
        document.getElementById('data_entrada_input').style.border = "1px solid red";
        formValido = false;
    } else {
        document.getElementById('erroDataEntrada').style.display = 'none';
        document.getElementById('data_entrada_input').style.border = ""; // Remove a borda vermelha
    }

    if (origem === '') {
        document.getElementById('erroOrigem').innerText = 'Selecione uma origem.';
        document.getElementById('erroOrigem').style.display = 'block';
        document.getElementById('origem_input').style.border = "1px solid red";
        formValido = false;
    } else {
        document.getElementById('erroOrigem').style.display = 'none';
        document.getElementById('origem_input').style.border = ""; // Remove a borda vermelha
    }

    if (estado === '') {
        document.getElementById('erroEstado').innerText = 'Selecione um estado.';
        document.getElementById('erroEstado').style.display = 'block';
        document.getElementById('estado_input').style.border = "1px solid red";
        formValido = false;
    } else {
        document.getElementById('erroEstado').style.display = 'none';
        document.getElementById('estado_input').style.border = ""; // Remove a borda vermelha
    }

    if(memoriaRAM <= 0){
        document.getElementById('erroMemoriaRAM').innerText = 'O número deve ser um valor positivo (maior que 0).';
        document.getElementById('erroMemoriaRAM').style.display = 'block';
        document.getElementById('memoria_ram_input').style.border = "1px solid red";
        formValido = false;
    }else{
        document.getElementById('erroMemoriaRAM').style.display = 'none';
        document.getElementById('memoria_ram_input').style.border = "";
    }

    if(armazenamento <= 0){
        document.getElementById('erroArmazenamento').innerText = 'O número deve ser um valor positivo (maior que 0).';
        document.getElementById('erroArmazenamento').style.display = 'block';
        document.getElementById('armazenamento_input').style.border = "1px solid red";
        formValido = false;
    }else{
        document.getElementById('erroArmazenamento').style.display = 'none';
        document.getElementById('armazenamento_input').style.border = "";
    }

    // Se todos os campos forem válidos, envie o formulário
    if (formValido) {
        const computadorData = {
            id: id, // Passa o ID obtido da URL
            solicitante: solicitante,
            numeroChamado: numeroChamado,
            origem: origem,
            problema: problema,
            dataEntrada: dataEntrada,
            dataTermino: dataTermino,
            memoriaRAM: parseInt(memoriaRAM, 10),
            armazenamento: parseInt(armazenamento, 10),
            processador: processador,
            troca: troca,
            itensTrocados: itensTrocados,
            quemFez: quemFez,
            estado: estado,
        };

        // Faz a requisição PUT para a rota /computadores/editar
        $.ajax({
            url: 'http://localhost:8080/computadores/editar', // Certifique-se que a URL está correta
            method: 'PUT', // Método PUT para atualização
            contentType: 'application/json',
            data: JSON.stringify(computadorData), // Converte o objeto em JSON
            success: function(response) {
                localStorage.setItem('computadorAtualizado', 'true');
                window.location.href = '../html/computadores.html'; // Redireciona para outra página após o sucesso
            },
            error: function(xhr, status, error) {
                console.log('Erro ao editar computador: ' + error);
            }
        });
    }
});
