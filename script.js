function calcularRendimento() {
    const inicial = parseFloat(document.getElementById('inicial').value)
    const mensal = parseFloat(document.getElementById('mensal').value)
    let duracao = parseFloat(document.getElementById('duracao').value)
    const unidade = document.getElementById('periodo-unidade').value;
    const selic = 0.1065;

    if (unidade === "anos") {
        duracao *= 12;
    }

    const calc = inicial + (mensal * duracao) * (1 + selic);

    document.getElementById('resultado').textContent = `R$ ${calc.toFixed(2)}`;
}