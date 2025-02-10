const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="images/images/aprovado.png" alt="emoji festejando">';
const imgReprovado = '<img src="images/images/reprovado.png" alt="emoji triste">';
const atividades = [];
const notas = [];

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    const nota = parseFloat(inputNotaAtividade.value);
    atividades.push(inputNomeAtividade.value);
    notas.push(nota);

    let linha = `<tr>`;
    const nomeAtividadeFormatado = inputNomeAtividade.value.charAt(0).toUpperCase() + inputNomeAtividade.value.slice(1).toLowerCase();
    linha += `<td>${nomeAtividadeFormatado}</td>`;    
    linha += `<td>${nota}</td>`;
    linha += `<td>${nota >= 7 ? imgAprovado : imgReprovado}</td>`;
    linha += `</tr>`;

    linhas += linha;

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas; // Evita duplicação
}

function atualizaMediaFinal() {
    if (notas.length === 0) return;

    let somaDasNotas = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    let mediaFinal = somaDasNotas / notas.length;

    let resultadoFinal = document.querySelector('.resultado');
    resultadoFinal.textContent = mediaFinal >= 7 ? "Aprovado!" : "Reprovado!";

    resultadoFinal.classList.remove('aprovado', 'reprovado');
    resultadoFinal.classList.add(mediaFinal >= 7 ? 'aprovado' : 'reprovado');

    document.querySelector('tfoot td:nth-child(2)').textContent = mediaFinal.toFixed(2);
}
