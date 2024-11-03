async function buscarTaxas() {
    try {
        // Obtendo os dados da API do Banco Central
        const response = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados?formato=json"); // Endpoint da taxa Selic
        const dataSelic = await response.json();

        // Pegando o valor mais recente da série de dados
        const selic = dataSelic[dataSelic.length - 1].valor;

        // Definindo a taxa Selic no campo de input correspondente, convertendo para percentual anual
        document.getElementById('selic').value = (parseFloat(selic)).toFixed(2); // Multiplica por 100 para converter para %
    } catch (error) {
        console.error("Erro ao buscar as taxas de juros:", error);
    }
}

function calcularRendimento() {
    const inicial = parseFloat(document.getElementById('inicial').value);
    const mensal = parseFloat(document.getElementById('mensal').value);
    let duracao = parseFloat(document.getElementById('duracao').value);
    const unidade = document.getElementById('periodo-unidade').value;
    
    // Obtendo as taxas e convertendo para decimal
    const selic = parseFloat(document.getElementById('selic').value);
    const cdi = parseFloat(document.getElementById('CDI').value);

    if (unidade === "anos") {
        duracao *= 12; // Converte anos para meses
    }


    // Exemplo de cálculo básico com a taxa Selic
    const calc = inicial + (mensal * duracao) * (1 + selic);

    document.getElementById('resultado').textContent = `R$ ${calc.toFixed(2)}`;
}


