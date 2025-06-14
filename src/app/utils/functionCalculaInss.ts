
/*
    Tabela de contribuição mensal INSS - 2025

    Faixa   Salário  	                    Alíquota    Parcela a Deduzir   Valor Maximo
    1ª      Até R$ 1.518,00 	            7,5%        0                   R$ 113,85
    2ª      De R$ 1.518,01 a R$ 2.793,88	9%          R$ 22,77            R$ 114,82
    3ª      De R$ 2.793,89 até R$ 4.190,83 	12%         R$ 106,59           R$ 167,63
    4ª      De R$ 4.190,84 até R$ 8.157,41 	14%         R$ 190,40           R$ 555,32

    Fonte: https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal

    Exemplo: Salário de R$ 5.300,00
        Valor INSS R$ 560,82
*/
interface AliquotaInss {
    faixa: number;  
    aliquota: number; // Alíquota em decimal (ex: 0.075 para 7.5%)
    deducao: number; // Parcela a deduzir
    limiteInferior: number; // Limite inferior da faixa
    limiteSuperior: number; // Limite superior da faixa
    valorMaximoRetencao: number; // Valor máximo de retenção
}


const arrAliquotasInss: AliquotaInss[] = [
    {
        faixa: 1,
        aliquota: 0.075,
        deducao: 0,
        limiteInferior:  0,
        limiteSuperior:  1518.00,
        valorMaximoRetencao: 113.85,

    },
    {
        faixa: 2,
        aliquota: 0.09,
        deducao: 22.77,
        limiteInferior:  1518.01,
        limiteSuperior:  2793.88,
        valorMaximoRetencao: 114.82,

    },
    {
        faixa: 3,
        aliquota: 0.12,
        deducao: 106.59,
        limiteInferior:  2793.89,
        limiteSuperior:  4190.83,
        valorMaximoRetencao: 167.63,

    },
    {
        faixa: 4,
        aliquota: 0.14,
        deducao: 190.40,
        limiteInferior:  4190.84,
        limiteSuperior:  8157.41,
        valorMaximoRetencao: 555.32,

    }

]




//const salario: number = 0;

// Tipo de retorno da função
interface DadosInss {
  faixa: number;
  aliquota: number;
  valorInss: number;
  aliquotaEfetiva: number;
}


export function calcularInss(salario: number){
    for (let element of arrAliquotasInss){
        if (salario <= element.limiteSuperior) {
            const inss = parseFloat((salario * element.aliquota - element.deducao).toFixed(2))
            const dadosInss: DadosInss = {
                faixa: element.faixa,
                aliquota: element.aliquota,
                valorInss: inss,
                aliquotaEfetiva: parseFloat((100*inss/salario).toFixed(2))
            }
            
            //localStorage.setItem('valorInss', inss); // armazena no local storage
            return dadosInss
        }
      };
        // Se não encontrar faixa, pode retornar undefined ou lançar erro
      // Se salário for maior que o teto, retorna o valor máximo de retenção da última faixa
    const ultimaFaixa = arrAliquotasInss[arrAliquotasInss.length - 1];
    const inss = parseFloat((ultimaFaixa.limiteSuperior * ultimaFaixa.aliquota - ultimaFaixa.deducao).toFixed(2))
    return {
        faixa: ultimaFaixa.faixa,
        aliquota: ultimaFaixa.aliquota,
        valorInss: inss,
        aliquotaEfetiva: parseFloat(((100 * inss) / salario).toFixed(2))
        //aliquotaEfetiva: parseFloat((100*inss/salario).toFixed(2))
    };
}


