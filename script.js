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




    