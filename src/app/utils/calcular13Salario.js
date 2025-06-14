const salario13 = parseFloat(localStorage.getItem('salario13')); // resgata do local storage
//const valorIrrfCalculado = parseFloat(localStorage.getItem('valorIrrf')); // resgata do local storage
//const valorInssCalculado = parseFloat(localStorage.getItem('valorInss')); // resgata do local storage


//const salario13 = salarioParaCalculo13 / 2
//const salarioLiquido = salarioInformado - totalDescontos




const tdAdiantamento13 = document.getElementsByClassName("valorAdiantamento13");
for (let element of tdAdiantamento13){
    element.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salario13); 
}

