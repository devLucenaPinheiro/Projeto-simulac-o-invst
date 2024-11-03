async function buscarTaxas() {
    try {
        const urls = {
            selic: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados?formato=json",
            cdi: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados?formato=json",
            ipca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11426/dados?formato=json",
            tesouroIpca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json",
            tr: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados?formato=json",
            poupanca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.195/dados?formato=json"
        };

        async function fetchTaxa(url) {
            const response = await fetch(url);
            const data = await response.json();
            const valor = data[data.length - 1]?.valor;
            return parseFloat(valor);
        }

        const selic = await fetchTaxa(urls.selic);
        document.getElementById('selic').value = isNaN(selic) ? "N/A" : selic.toFixed(2);

        const cdi = await fetchTaxa(urls.cdi);
        document.getElementById('CDI').value = isNaN(cdi) ? "N/A" : cdi.toFixed(2);

        const ipca = await fetchTaxa(urls.ipca);
        document.getElementById('ipca').value = isNaN(ipca) ? "N/A" : ipca.toFixed(2);

        const tesouroIpca = await fetchTaxa(urls.tesouroIpca);
        document.getElementById('tesouro-ipca').value = isNaN(tesouroIpca) ? "N/A" : tesouroIpca.toFixed(2);

        const tr = await fetchTaxa(urls.tr);
        document.getElementById('tr').value = isNaN(tr) ? "N/A" : tr.toFixed(4);

        const poupanca = await fetchTaxa(urls.poupanca);
        document.getElementById('poupanca').value = isNaN(selic) ? "N/A" : poupanca.toFixed(4);

    } catch (error) {
        console.error("Erro ao buscar as taxas de juros:", error);
    }
}

function calcularRendimento() {
    const inicial = parseFloat(document.getElementById('inicial').value);
    const mensal = parseFloat(document.getElementById('mensal').value);
    let duracao = parseFloat(document.getElementById('duracao').value);
    const unidade = document.getElementById('periodo-unidade').value;
    
    const selic = parseFloat(document.getElementById('selic').value);
    const cdi = parseFloat(document.getElementById('cdi').value);

    if (unidade === "anos") {
        duracao *= 12;
    }


    const calc = inicial + (mensal * duracao) * (1 + selic);

    document.getElementById('resultado').textContent = `R$ ${calc.toFixed(2)}`;
}