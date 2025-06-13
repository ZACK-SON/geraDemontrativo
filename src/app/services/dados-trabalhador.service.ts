import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Trabalhador {
  nomeTrabalhador: string;
  matriculaTrabalhador: string;
  salario: number;
}

@Injectable({
  providedIn: 'root'
})
export class DadosTrabalhadorService {

  private trabalhadorSubject = new BehaviorSubject<Trabalhador>({
    nomeTrabalhador: 'Nome do Trabalhador a receber no Service',
    matriculaTrabalhador: 'Matrícula não recebida',
    salario: 0
  });


  setDados(nomeTrabalhador: string, matriculaTrabalhador: string, salario: number) {
    this.trabalhadorSubject.next({ nomeTrabalhador, matriculaTrabalhador, salario });
  }

  getDados() {
    return this.trabalhadorSubject.asObservable();
  }

  constructor() { }
}
