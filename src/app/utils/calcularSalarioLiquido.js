


const salarioInformado = parseFloat(localStorage.getItem('salario')); // resgata do local storage

const salario13AdiantadoNovembro = salarioInformado/2 // resgata do local storage

const totalCreditosrecebidos = localStorage.getItem('totalCreditos');

const valorIrrfCalculado = parseFloat(localStorage.getItem('valorIrrf')); // resgata do local storage
const valorInssCalculado = parseFloat(localStorage.getItem('valorInss')); // resgata do local storage

const valorIrrf13Calculado = parseFloat(localStorage.getItem('valorIrrf')); // resgata do local storage
const valorInss13Calculado = parseFloat(localStorage.getItem('valorInss')); // resgata do local storage


const intMes = parseInt(localStorage.getItem('mesReferencia'));

let totalDescontos = 0

//const totalDescontos = valorInssCalculado + valorIrrfCalculado + valorIrrf13Calculado + valorInss13Calculado

if(intMes === 12){

    //console.log(`calcularSalarioLiquido| mês 12: ${intMes}`)
    totalDescontos = salario13AdiantadoNovembro + valorInssCalculado + valorIrrfCalculado + valorIrrf13Calculado + valorInss13Calculado

} else{
    //console.log(`calcularSalarioLiquido| não é mês 12: ${intMes}`)
    totalDescontos = valorInssCalculado + valorIrrfCalculado
    //const salarioLiquido = salarioInformado - totalDescontos
}


const salarioLiquido = totalCreditosrecebidos - totalDescontos

//console.log(`calcularSalarioLiquido| líquido: ${salarioLiquido}`)








const tdTotalDescontos = document.getElementsByClassName("totalDescontos");
for (let element of tdTotalDescontos){
    element.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDescontos); 
}

const tdSalarioLiquido = document.getElementsByClassName("salarioLiquido");
for (let element of tdSalarioLiquido){
    element.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salarioLiquido); 
}



// console.log(`Irrf: ${valorIrrfCalculado}`)
// console.log(`Inss: ${valorInssCalculado}`)
// console.log(`Descontos: ${totalDescontos}`)
// console.log(`Salário Líquido: ${salarioLiquido}`)