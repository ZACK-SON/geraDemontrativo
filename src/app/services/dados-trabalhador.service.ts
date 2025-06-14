import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { calcularInss } from '../utils/functionCalculaInss';

interface Trabalhador {
  nomeEmpregador: string;
  codEstabelecimento: string;
  local: string;
  nomeTrabalhador: string;
  matriculaTrabalhador: string;
  salario: number;
  data: any;
  valorInss: number | undefined;
  aliquotaEfetiva: number | undefined;
  valorFgts: number; 
  irrf: number; 
  faixa: number;
  aliquotaEfetivaIrrf: number; 
  baseCalculoIrrf: number; 
  salarioLiquido: number;
  //demonstrativoVisivel: boolean; // Adicionando a propriedade demonstrativo
}



@Injectable({
  providedIn: 'root'
})
export class DadosTrabalhadorService {


  private trabalhadorSubject = new BehaviorSubject<Trabalhador>({
    nomeEmpregador: 'Nome a receber no Service',
    codEstabelecimento: 'Codigo do Estabelecimento a receber no Service',
    local: 'local a receber no Service',
    nomeTrabalhador: 'Nome do Trabalhador a receber no Service',
    matriculaTrabalhador: 'Matrícula não recebida',
    salario: 0,
    data: "99/9999",
    valorInss: 0,
    aliquotaEfetiva: 0,
    valorFgts: 0,
    irrf: 0,
    faixa: 0,
    aliquotaEfetivaIrrf: 0,
    baseCalculoIrrf: 0,
    salarioLiquido: 0,
    //demonstrativoVisivel: false 
   
  });




  setDados(trabalhador: Trabalhador) {
    this.trabalhadorSubject.next(trabalhador);
  }

  getDados() {
    return this.trabalhadorSubject.asObservable();
  }

  constructor() { }
}
