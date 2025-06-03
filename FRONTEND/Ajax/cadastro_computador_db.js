//VERIFICA SE EXISTE UMA SESSÃO NO NAVEGADOR
if (!localStorage.getItem('userId')) {
    window.location.href = '../index.html'; // Redireciona para a página de computadores
}

document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar as origens no select box, separadas por secretarias
    function carregarOrigens() {
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
                    secretarias[secretariaDescricao].appendChild(option);
                });
            },
            error: function(xhr, status, error) {
                console.log('Erro ao carregar origens: ' + error);
            }
        });
    }

    // Chama a função para carregar as origens quando a página for carregada
    carregarOrigens();

    // Função para carregar os estados no select box
    function carregarEstados() {
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
                    selectEstado.appendChild(option);
                });
            },
            error: function(xhr, status, error) {
                console.log('Erro ao carregar estados: ' + error);
            }
        });
    }

     // Chama a função para carregar os estados quando a página for carregada
     carregarEstados();
});// Função para enviar os dados via POST
document.getElementById('form_cadastro_computador').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const patrimonio = document.getElementById('patrimonio_input').value.trim();
    const solicitante = document.getElementById('solicitante_input').value;
    const numeroChamado = document.getElementById('numero_chamado_input').value;
    const origem = document.getElementById('origem_input').value;
    const problema = document.getElementById('problema_input').value;
    const dataEntrada = document.getElementById('data_entrada_input').value;
    const dataTermino = document.getElementById('data_termino_input').value;
    const memoriaRAM = document.getElementById('memoria_ram_input').value;
    const armazenamento = document.getElementById('armazenamento_input').value;
    const processador = document.getElementById('processador_input').value;
    const troca = document.getElementById('troca_input').value === 'sim';
    const itensTrocados = document.getElementById('itens_trocados_input').value;
    const quemFez = document.getElementById('quem_fez_input').value;
    const estado = document.getElementById('estado_input').value;

    // Converte as strings das datas em objetos Date para comparação
    const dataEntradaObj = new Date(dataEntrada);
    const dataTerminoObj = new Date(dataTermino);

    let formValido = true;

    // Verifica se a data de entrada é maior que a data de término
    if (dataEntradaObj > dataTerminoObj) {
        document.getElementById('erroDataEntrada').innerText = 'A data de entrada não pode ser superior à data de término.';
        document.getElementById('erroDataEntrada').style.display = 'block';
        document.getElementById('data_entrada_input').style.border = "1px solid red";
        alert("Data de entrada deve ser inferior/igual a data de saída!");
        formValido = false;
    } else {
        document.getElementById('erroDataEntrada').style.display = 'none';
        document.getElementById('data_entrada_input').style.border = ""; // Remove a borda vermelha
    }

    // Verificação dos selects de origem e estado
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
            patrimonio: patrimonio,
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
            itensTrocados: troca ? itensTrocados : null,
            quemFez: quemFez,
            estado: estado
        };

        // Faz a requisição POST para a rota /computadores
        $.ajax({
            url: 'http://localhost:8080/computadores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(computadorData), // Converte o objeto em JSON
            success: function(response) {
                localStorage.setItem('computadorInserido', 'true');
                window.location.href = '../html/computadores.html'; // Redireciona para outra página após o sucesso
            },
            error: function(xhr, status, error) {
                console.log('Erro ao cadastrar computador: ' + error);
            }
        });
    }
});