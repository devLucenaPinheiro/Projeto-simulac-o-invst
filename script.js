async function buscarTaxas() {
    try {
        const urls = {
            selic: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados?formato=json",
            cdi: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados?formato=json",
            ipca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11426/dados?formato=json",
            tesouroIpca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json",
            tr: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados?formato=json",
            poupanca: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.195/dados?formato=json"
        }

        async function fetchTaxa(url) {
            const response = await fetch(url)
            const data = await response.json()
            const valor = data[data.length - 1]?.valor
            return parseFloat(valor)
        }

        const selic = await fetchTaxa(urls.selic)
        document.getElementById('selic').value = isNaN(selic) ? "N/A" : selic.toFixed(2)
        const cdi = await fetchTaxa(urls.cdi)
        document.getElementById('cdi').value = isNaN(cdi) ? "N/A" : cdi.toFixed(2)
        const ipca = await fetchTaxa(urls.ipca)
        document.getElementById('ipca').value = isNaN(ipca) ? "N/A" : ipca.toFixed(2)
        const tesouroIpca = await fetchTaxa(urls.tesouroIpca)
        document.getElementById('tesouro-ipca').value = isNaN(tesouroIpca) ? "N/A" : tesouroIpca.toFixed(2)
        const tr = await fetchTaxa(urls.tr)
        document.getElementById('tr').value = isNaN(tr) ? "N/A" : tr.toFixed(4)
        const poupanca = await fetchTaxa(urls.poupanca)
        document.getElementById('poupanca').value = isNaN(poupanca) ? "N/A" : poupanca.toFixed(4)
        const CDB = 100
        document.getElementById('CDB').value = isNaN(CDB) ? "N/A" : CDB.toFixed(0)
        const tesouroPrefix = 5.50
        document.getElementById('tesouroPrefix').value = isNaN(tesouroPrefix) ? "N/A" : tesouroPrefix.toFixed(2)
        const admDi = 0.25
        document.getElementById('admDi').value = isNaN(admDi) ? "N/A" : admDi.toFixed(2)
        const rentDi = 98.17
        document.getElementById('rentDi').value = isNaN(rentDi) ? "N/A" : rentDi.toFixed(2)

    } catch (error) {
        console.error("Erro ao buscar as taxas de juros:", error)
    }
}

function calcularRendimento() {
    const inicial = parseFloat(document.getElementById('inicial').value) || 0
    const mensal = parseFloat(document.getElementById('mensal').value) || 0
    let duracao = parseFloat(document.getElementById('duracao').value) || 0
    const unidade = document.getElementById('periodo-unidade').value

    if (unidade === "anos") {
        duracao *= 12
    }

    let selic = parseFloat(document.getElementById('selic').value) / 100 / 12
    let cdi = parseFloat(document.getElementById('cdi').value) / 100 / 12
    let ipca = parseFloat(document.getElementById('ipca').value) / 100
    let tr = parseFloat(document.getElementById('tr').value) / 100
    let poupanca = parseFloat(document.getElementById('poupanca').value) / 100
    let tesouroIpca = parseFloat(document.getElementById('tesouro-ipca').value) / 100

    if (unidade === "anos") {
        ipca = Math.pow(1 + ipca, 12) - 1
        tr = Math.pow(1 + tr, 12) - 1
        poupanca = Math.pow(1 + poupanca, 12) - 1
        tesouroIpca = Math.pow(1 + tesouroIpca, 12) - 1
    } else {
        ipca = Math.pow(1 + ipca, 1/12) - 1
        tr = Math.pow(1 + tr, 1/12) - 1
        poupanca = Math.pow(1 + poupanca, 1/12) - 1
        tesouroIpca = Math.pow(1 + tesouroIpca, 1/12) - 1
    }

    const rendimentoSelic = inicial * Math.pow(1 + selic, duracao) + mensal * ((Math.pow(1 + selic, duracao) - 1) / selic)
    const rendimentoCdi = inicial * Math.pow(1 + cdi, duracao) + mensal * ((Math.pow(1 + cdi, duracao) - 1) / cdi)
    const rendimentoIpca = inicial * Math.pow(1 + ipca, duracao) + mensal * ((Math.pow(1 + ipca, duracao) - 1) / ipca)
    const rendimentoTr = inicial * Math.pow(1 + tr, duracao) + mensal * ((Math.pow(1 + tr, duracao) - 1) / tr)
    const rendimentoPoupanca = inicial * Math.pow(1 + poupanca, duracao) + mensal * ((Math.pow(1 + poupanca, duracao) - 1) / poupanca)

    document.getElementById('resultado-selic').textContent = `Rendimento Selic: R$ ${rendimentoSelic.toFixed(2)}`
    document.getElementById('resultado-cdi').textContent = `Rendimento CDI: R$ ${rendimentoCdi.toFixed(2)}`
    document.getElementById('resultado-ipca').textContent = `Rendimento IPCA: R$ ${rendimentoIpca.toFixed(2)}`
    document.getElementById('resultado-tr').textContent = `Rendimento TR: R$ ${rendimentoTr.toFixed(2)}`
    document.getElementById('resultado-poupanca').textContent = `Rendimento na poupança: R$ ${rendimentoPoupanca.toFixed(2)}`
}


    const selic = parseFloat(document.getElementById('selic').value)
    document.getElementById('rendimento-selic').textContent = selic ? `R$ ${calcularParaTaxa(selic)}` : "N/A"

    const cdi = parseFloat(document.getElementById('cdi').value)
    document.getElementById('rendimento-cdi').textContent = cdi ? `R$ ${calcularParaTaxa(cdi)}` : "N/A"

    const ipca = parseFloat(document.getElementById('ipca').value)
    document.getElementById('rendimento-ipca').textContent = ipca ? `R$ ${calcularParaTaxa(ipca)}` : "N/A"

    const tr = parseFloat(document.getElementById('tr').value)
    document.getElementById('rendimento-tr').textContent = tr ? `R$ ${calcularParaTaxa(tr * 100)} (a.m.)` : "N/A"

    const poupanca = parseFloat(document.getElementById('poupanca').value)
    document.getElementById('rendimento-poupanca').textContent = poupanca ? `R$ ${calcularParaTaxa(poupanca)}` : "N/A"