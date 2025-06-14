const aliquotaFgts: number = 0.08

// console.log(valorFgts)

export function calculaFgts(salarioInformado: number): number {
    return salarioInformado * aliquotaFgts;
}

