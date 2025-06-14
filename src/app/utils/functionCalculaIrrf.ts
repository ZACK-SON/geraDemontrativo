

interface AliquotaIrrf {
    faixa: number;  
    aliquota: number; // percentual
    deducao: number; // valor a deduzir
    infoFaixa: string; // descrição da faixa
    limiteInferior: number; // limite inferior da faixa
    limiteSuperior: number; // limite superior da faixa
    valorMaximoRetencao: number; // valor máximo de retenção
    descontoSimplificado: number; // valor do desconto simplificado
    
}

            interface dadosIrrf {
                baseCalculo:number,
                irrf: number,
                faixa: number,
                aliquota: number,
                deducao: number,
                aliquotaEfetiva: number,
            }


const arrayAliquotas: AliquotaIrrf[] = [
    {
        faixa: 1,
        aliquota: 0,
        deducao: 0,
        infoFaixa: "Isento",
        limiteInferior:  0,
        limiteSuperior:  2428.80,
        valorMaximoRetencao: 0,
        descontoSimplificado: 607.20

    },
    {
        faixa: 2,
        aliquota: 0.075,
        deducao: 182.16,
        infoFaixa: "Faixa 2",
        limiteInferior:  2428.81,
        limiteSuperior:  2826.65,
        valorMaximoRetencao: 42.56,
        descontoSimplificado: 607.20

    },
    {
        faixa: 3,
        aliquota: 0.15,
        deducao: 394.86,
        infoFaixa: "Faixa 3",
        limiteInferior:  2826.66,
        limiteSuperior:  3751.05,
        valorMaximoRetencao: 138.66,
        descontoSimplificado: 607.20

    },
    {
        faixa: 4,
        aliquota: 0.225,
        deducao: 675.49,
        infoFaixa: "Faixa 4",
        limiteInferior:  3751.06,
        limiteSuperior:  4664.68,
        valorMaximoRetencao: 205.56,
        descontoSimplificado: 607.20

    },
    {
        faixa: 5,
        aliquota: 0.275,
        deducao: 908.73,
        infoFaixa: "Faixa 5",
        limiteInferior:  4664.68,
        limiteSuperior:  9999999.00,
        valorMaximoRetencao: 9999999.00,
        descontoSimplificado: 607.20

    }

]

// cálculo feito com desconto simplificado
//https://www27.receita.fazenda.gov.br/simulador-irpf/

export function calculaIrrf(salario: number): any {

    const baseCalculo:number = salario  - arrayAliquotas[0].descontoSimplificado

       for (let element of arrayAliquotas){

        if (baseCalculo <= element.limiteSuperior) {
            const irrf: number = parseFloat((baseCalculo * element.aliquota - element.deducao).toFixed(2))
            //converte para currency BR
            const irrfCalculado: number = irrf;
            const aliquotaEfetiva: number = parseFloat((100*irrf/salario).toFixed(2))

            const dadosUIrrf: dadosIrrf = {
                baseCalculo:baseCalculo,
                irrf: irrfCalculado,
                faixa: element.faixa,
                aliquota: parseFloat((element.aliquota*100).toFixed(2)),
                deducao: element.deducao,
                aliquotaEfetiva: aliquotaEfetiva,
            }

            return dadosUIrrf


        }
        
      };


}  




