import { Component, OnInit} from '@angular/core';
import { DadosTrabalhadorService } from 'src/app/services/dados-trabalhador.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demonstrativo',
  standalone: true,
  templateUrl: './demonstrativo.component.html',
  styleUrls: ['./demonstrativo.component.scss']
})
export class DemonstrativoComponent implements OnInit {

  constructor(private dadosTrabalhadorService: DadosTrabalhadorService) {}

  private sub!: Subscription;
  // Para receber dados:

  nomeTrabalhador: string = '';
  matriculaTrabalhador: string = '';
  salario: number = 0;

  
  ngOnInit() {
    this.sub = this.dadosTrabalhadorService.getDados().subscribe(dados => {
      this.nomeTrabalhador = dados.nomeTrabalhador;
      this.matriculaTrabalhador = dados.matriculaTrabalhador;
      this.salario = dados.salario;
    });
  }

}
