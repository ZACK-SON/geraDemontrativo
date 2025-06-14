import { Component, OnInit} from '@angular/core';
import { DadosTrabalhadorService } from 'src/app/services/dados-trabalhador.service';
import { Subscription } from 'rxjs';
//import { AppModule } from 'src/app/app.module';
import { MesAnoExtensoPipe } from 'src/app/mes-ano-extenso.pipe';
import { CommonModule } from '@angular/common';
//import { calcularInss } from 'src/app/utils/functionCalculaInss';

            interface dadosIrrf {
                baseCalculo:number,
                irrf: number,
                faixa: number,
                aliquota: number,
                deducao: number,
                aliquotaEfetiva: number,
            }

@Component({
  selector: 'app-demonstrativo',
  standalone: true,
  imports: [MesAnoExtensoPipe,CommonModule],
  templateUrl: './demonstrativo.component.html',
  styleUrls: ['./demonstrativo.component.scss']
})
export class DemonstrativoComponent implements OnInit {

  constructor(private dadosTrabalhadorService: DadosTrabalhadorService) {}

  private sub!: Subscription;
  // Para receber dados:
  nomeEmpregador: string = '';
  codEstabelecimento: string = '';
  local: string = ''; 
  nomeTrabalhador: string = '';
  matriculaTrabalhador: string = '';
  salario: number = 0;
  data: any = null;
  resultadoInss: any;
  valorInss: number | undefined = 0;
  aliquotaEfetiva: number | undefined  = 0;
  valorFgts: number = 0; 
  baseCalculo: number = 0;
  resultadoIrrf: dadosIrrf | undefined = undefined;
  irrf: number = 0; // Valor do IRRF
  faixa: number = 0; // Faixa do IRRF
  aliquotaEfetivaIrrf: number = 0; 
  baseCalculoIrrf: number = 0;
  demonstrativoVisivel: boolean = false; // Para controlar a visibilidade do demonstrativo
  salarioLiquido: number = 0; // Para armazenar o salário líquido
  totalDescontos: number = 0; // Para armazenar o total de descontos




  ngOnInit() {
    this.sub = this.dadosTrabalhadorService.getDados().subscribe(dados => {
      this.nomeEmpregador = dados.nomeEmpregador;
      this.codEstabelecimento = dados.codEstabelecimento;
      this.local = dados.local;
      this.nomeTrabalhador = dados.nomeTrabalhador;
      this.matriculaTrabalhador = dados.matriculaTrabalhador;
      this.salario = dados.salario;
      this.data = dados.data;
      this.valorInss = dados.valorInss;
      this.aliquotaEfetiva = dados.aliquotaEfetiva;
      this.valorFgts = dados.valorFgts;
      this.irrf = dados.irrf;
      this.faixa = dados.faixa;
      this.aliquotaEfetivaIrrf = dados.aliquotaEfetivaIrrf;
      this.baseCalculoIrrf = dados.baseCalculoIrrf;
      this.salarioLiquido = dados.salarioLiquido;
      //this.demonstrativoVisivel = dados.demonstrativoVisivel;
      this.totalDescontos = (Number(dados.valorInss) || 0) + dados.irrf;
    });
  }

  // calcularInssParaTrabalhador() {
  //   this.resultadoInss = calcularInss(this.salario);  
  // }

}
