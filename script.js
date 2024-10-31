function calcularRendimento(){


let inicial = parseFloat(document.getElementById('inicial').value)
let mensal = parseFloat(document.getElementById('mensal').value)
let duracao = parseFloat(document.getElementById('duracao').value)
let periodoSelecionado = document.getElementById('periodo-unidade').value
let selic = 0.1065

if(periodoSelecionado === 'anos'){
    duracao = duracao * 12
}

let calc = inicial + (mensal * duracao) * (1 + selic)
    alert("O lucro será de: " + calc.toFixed(2))
}