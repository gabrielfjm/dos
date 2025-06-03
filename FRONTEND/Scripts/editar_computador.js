document.addEventListener("DOMContentLoaded", function() {
    let hoje = new Date().toISOString().split('T')[0];

    // Limita a data de término para não ser maior que a data atual
    document.getElementById('data_entrada_input').setAttribute('max', hoje);
    document.getElementById('data_termino_input').setAttribute('max', hoje);
    
    // Função para garantir que a data de entrada seja inferior ou igual à data de término
    function validarDatas(event) {
        const dataEntrada = document.getElementById('data_entrada_input').value;
        const dataTermino = document.getElementById('data_termino_input').value;

        if (dataEntrada > dataTermino) {
            event.preventDefault();
            document.getElementById('erroDataEntrada').innerText = 'A data de entrada não pode ser superior à data de término.';
            document.getElementById('erroDataEntrada').style.display = 'block';
            document.getElementById('data_entrada_input').style.border = "1px solid red";
        } else {
            document.getElementById('erroDataEntrada').style.display = 'none';
            document.getElementById('data_entrada_input').style.border = ""; // Remove a borda vermelha
        }
    }

    // Função para exibir/esconder campo de itens trocados
    function toggleItensTrocados() {
        const trocaSelect = document.getElementById('troca_input');
        const itensTrocadosContainer = document.getElementById('itens_trocados_container');
        const itensTrocadosInput = document.getElementById('itens_trocados_input');

        if (trocaSelect.value === 'sim') {
            itensTrocadosContainer.style.display = 'block';
            itensTrocadosInput.setAttribute('required', 'required');
        } else {
            itensTrocadosContainer.style.display = 'none';
            itensTrocadosInput.removeAttribute('required');
            itensTrocadosInput.value = ''; // Limpa o valor do campo
        }
    }

    // Aplica a função de toggle no select de troca
    document.getElementById('troca_input').addEventListener('change', toggleItensTrocados);

    // Função para aplicar o regex no número de chamado e formatar automaticamente
    function formatarNumeroChamado(event) {
        const chamadoInput = event.target;
        let chamado = chamadoInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        const anoAtual = new Date().getFullYear();

        if (chamado.length > 5) {
            chamado = chamado.slice(0, 5);
        }

        if (chamado.length === 4) {
            chamado = chamado.replace(/(\d{1})(\d{3})/, "$1.$2/" + anoAtual);
        } else if (chamado.length === 5) {
            chamado = chamado.replace(/(\d{2})(\d{3})/, "$1.$2/" + anoAtual);
        }

        chamadoInput.value = chamado;
    }

    const numeroChamadoInput = document.getElementById('numero_chamado_input');
    numeroChamadoInput.addEventListener('input', formatarNumeroChamado);

    // Função de validação de campos antes do envio do formulário
    document.getElementById('form_editar_computador').addEventListener('submit', function(event) {
        const solicitante = document.getElementById('solicitante_input');
        const numeroChamado = document.getElementById('numero_chamado_input');
        const problema = document.getElementById('problema_input');
        const processador = document.getElementById('processador_input');
        const quemFez = document.getElementById('quem_fez_input');
        const dataEntrada = document.getElementById('data_entrada_input');
        const dataTermino = document.getElementById('data_termino_input');
        const memoriaRAM = document.getElementById('memoria_ram_input');
        const armazenamento = document.getElementById('armazenamento_input');
        const origem = document.getElementById('origem_input');
        const estado = document.getElementById('estado_input');
        let formValido = true;

        // Validação das datas
        validarDatas(event);

        // Validação dos campos de texto
        validarCampoAntesSubmit(solicitante, 'erroSolicitante');
        validarCampoAntesSubmit(numeroChamado, 'erroNumeroChamado');
        validarCampoAntesSubmit(problema, 'erroProblema');
        validarCampoAntesSubmit(processador, 'erroProcessador');
        validarCampoAntesSubmit(quemFez, 'erroQuemFez');
        validarCampoNumericoAntesSubmit(memoriaRAM, 'erroMemoriaRAM');
        validarCampoNumericoAntesSubmit(armazenamento, 'erroArmazenamento');

        // Validação dos selects
        validarSelectAntesSubmit(origem, 'erroOrigem');
        validarSelectAntesSubmit(estado, 'erroEstado');

        validarCampoAntesSubmit(dataEntrada, 'erroDataEntrada');
        validarCampoAntesSubmit(dataTermino, 'erroDataTermino');

        if (!formValido) {
            event.preventDefault();
            exibirModal(); // Dispara o modal de erro
        }
    });

    // Aplica a função de validação nos inputs de texto enquanto o usuário digita
    validarCampo(document.getElementById('solicitante_input'), 'erroSolicitante');
    validarCampo(document.getElementById('numero_chamado_input'), 'erroNumeroChamado');
    validarCampo(document.getElementById('problema_input'), 'erroProblema');
    validarCampo(document.getElementById('processador_input'), 'erroProcessador');
    validarCampo(document.getElementById('quem_fez_input'), 'erroQuemFez');
    validarCampoNumerico(document.getElementById('memoria_ram_input'), 'erroMemoriaRAM');
    validarCampoNumerico(document.getElementById('armazenamento_input'), 'erroArmazenamento');
    
    // Aplica a função de validação nos selects
    validarSelect(document.getElementById('origem_input'), 'erroOrigem');
    validarSelect(document.getElementById('estado_input'), 'erroEstado');
});

// Função para exibir modal quando campos estão vazios
function exibirModalDataInvalida() {
    const modal = document.getElementById('modal-data');
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

