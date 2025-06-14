import { Component, inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { calcularInss } from 'src/app/utils/functionCalculaInss';
import { calculaFgts } from 'src/app/utils/calculaFgts';
import { calculaIrrf } from 'src/app/utils/functionCalculaIrrf';
//import { DemonstrativoVisivelService } from 'src/app/services/demonstrativo-visivel.service';

//import { Inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

//import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
//import 'moment/locale/pt-br';
import { ViewChild, ElementRef } from '@angular/core';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.

// import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;

import * as moment from 'moment';
import { Moment } from 'moment';
import {DemonstrativoComponent} from '../demonstrativo/demonstrativo.component';
import { DadosTrabalhadorService } from 'src/app/services/dados-trabalhador.service';

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
  
}

      // Tipo de retorno da função
      interface DadosInss {
        faixa: number;
        aliquota: number;
        valorInss: number;
        aliquotaEfetiva: number;
      }

      interface dadosIrrf {
          baseCalculo:number,
          irrf: number,
          faixa: number,
          aliquota: number,
          deducao: number,
          aliquotaEfetiva: number,
      }

      
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};





/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-selecao-trabalhador',
  standalone: true,
    imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    DemonstrativoComponent,
  ],
  templateUrl: './selecao-trabalhador.component.html',
  styleUrls: ['./selecao-trabalhador.component.scss'],
    providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})



export class SelecaoTrabalhadorComponent implements OnInit, AfterViewInit {

  @ViewChild('conteudoPDF') conteudoPDF!: ElementRef;
  @ViewChild('divRecibo') divRecibo!: ElementRef;

  //class="divRecibo"

  //constructor(@Inject(MAT_DATE_LOCALE) private locale: string) {}

  hoje = moment();//
  // console.log('Mês anterior:', hoje.month()); // mês começa em 0
  // console.log('Ano atual:', hoje.year());

  // datepicker
  readonly date = new FormControl(moment(`${this.hoje.year()}-${this.hoje.month()}`, 'YYYY-MM'));


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    //onTrabalhadorChange()
  }


  // input
  salarioFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  empregadores: any[] = [];
  trabalhadores: any[] = [];
  empregadorSelecionado: any = null;
  trabalhadorSelecionado: any = null;
  salarioTrabalhadorSelecionado: any = null;
  matriculaTrabalhadorSelecionado: any = null;
  codEstabelecimentoTrabalhadorSelecionado: any = null;
  localTrabalhadorSelecionada: any = null;
  dataSelecioanda: any = null;
  resultadoInss: DadosInss | undefined = undefined;
  valorInss: number = 0;
  aliquotaEfetiva: number = 0;
  valorFgts: number = 0;
  resultadoIrrf: dadosIrrf | undefined = undefined;
  irrf: number = 0;
  faixa: number = 0;
  baseCalculoIrrf:number = 0;
  aliquotaEfetivaIrrf: number = 0;
  totalDescontos: number = 0;
  

  //variável de controle
  demonstrativoVisivel: boolean = false;

  salarioLiquido: number = 0;


   #http = inject(HttpClient);

  public getDadosEmpregadores(){
    this.#http.get<any[]>('assets/json/empregadores.json').subscribe(data => {
        this.empregadores = data;
       // console.log('Empregadores:', this.empregadores);
      });
  }


  ngOnInit() {
    this.getDadosEmpregadores();
    
    //console.log('Empregador selecionado:', this.empregadorSelecionado);
    //moment.locale('pt-br');
  }
  ngAfterViewInit(): void {
    this.ocultarConteudoPDF()
  }


  // preenche o array de objetos this.trabalhadores do empregador selecionado
  onEmpregadorChange(event: any) {
    this.empregadorSelecionado = event.value;
    //console.log('Empregador selecionado:', this.empregadorSelecionado);

        for (let empregador of this.empregadores){
          if (empregador.nomeEmpregador === this.empregadorSelecionado) {
              this.trabalhadores = empregador.empregados
              this.codEstabelecimentoTrabalhadorSelecionado = empregador.codEstabelecimento
              this.localTrabalhadorSelecionada = empregador.local


              //console.log('Trabalhador do empregador selecionado:', this.trabalhadores);
              //console.log('Código do Estabelecimento:', empregador.codEstabelecimento);
              //console.log('Local do Estabelecimento:', empregador.local);



              for (let trabalhador of this.trabalhadores){
                  
                  //console.log('Trabalhadores do empregador selecionado:', trabalhador.nomeTrabalhador);
                  //console.log('Salário:', trabalhador.salario);
              }
          }
        }

      }

      

    onTrabalhadorChange(event: any) {
      this.trabalhadorSelecionado  = event.value.nomeTrabalhador;  
      this.salarioTrabalhadorSelecionado = event.value.salario;
      this.matriculaTrabalhadorSelecionado = event.value.matricula;
      this.salarioFormControl.setValue(`R$ ${this.salarioTrabalhadorSelecionado},00`)


     
        this.resultadoInss = calcularInss(this.salarioTrabalhadorSelecionado);
        this.valorFgts = calculaFgts(this.salarioTrabalhadorSelecionado);
        this.resultadoIrrf = calculaIrrf(this.salarioTrabalhadorSelecionado);

        this.totalDescontos = this.resultadoInss.valorInss + this.resultadoIrrf!.irrf;

        this.salarioLiquido = this.salarioTrabalhadorSelecionado - this.totalDescontos;
    
          //console.log('Valor IRRF:', this.resultadoIrrf!.irrf);
      //console.log('Valor Inss:', this.resultadoInss?.valorInss);
      //console.log('Aliquota Inss:', this.resultadoInss?.aliquotaEfetiva);
              //codEstabelecimento
              //local
      //console.log('event:', event);
      //console.log('Trabalhador selecionado:', this.trabalhadorSelecionado);
      //console.log('Salário:', this.salarioTrabalhadorSelecionado);
      //console.log('Matrícula do trabalhador selecionado:', this.matriculaTrabalhadorSelecionada);

      // Para enviar dados para service:



      const trabalhador: Trabalhador = {
        nomeEmpregador: this.empregadorSelecionado,
        codEstabelecimento: this.codEstabelecimentoTrabalhadorSelecionado,
        local: this.localTrabalhadorSelecionada,
        nomeTrabalhador: this.trabalhadorSelecionado,
        matriculaTrabalhador: this.matriculaTrabalhadorSelecionado,
        salario: this.salarioTrabalhadorSelecionado,
        data: this.date.value?.format('MM/YYYY'),
        valorInss: this.resultadoInss!.valorInss,
        aliquotaEfetiva: this.resultadoInss!.aliquotaEfetiva,
        valorFgts: this.valorFgts,
        irrf: this.resultadoIrrf!.irrf, 
        faixa: this.resultadoIrrf!.faixa,
        baseCalculoIrrf: this.resultadoIrrf!.baseCalculo,
        aliquotaEfetivaIrrf: this.resultadoIrrf!.aliquotaEfetiva,
        salarioLiquido: this.salarioLiquido
        //demonstrativoVisivel: false // Inicialmente, o demonstrativo não está visível  
        
      };

      this.dadosTrabalhadorService.setDados(trabalhador);

    }


    onMesChange(){

        const trabalhador: Trabalhador = {
          nomeEmpregador: this.empregadorSelecionado,
          codEstabelecimento: this.codEstabelecimentoTrabalhadorSelecionado,
          local: this.localTrabalhadorSelecionada,
          nomeTrabalhador: this.trabalhadorSelecionado,
          matriculaTrabalhador: this.matriculaTrabalhadorSelecionado,
          salario: this.salarioTrabalhadorSelecionado,
          data: this.date.value?.format('MM/YYYY'),
          valorInss: this.resultadoInss!.valorInss,
          aliquotaEfetiva:this.resultadoInss!.aliquotaEfetiva,
          valorFgts: this.valorFgts,
          irrf: this.resultadoIrrf!.irrf, 
          faixa: this.resultadoIrrf!.faixa,
          baseCalculoIrrf: this.resultadoIrrf!.baseCalculo,
          aliquotaEfetivaIrrf: this.resultadoIrrf!.aliquotaEfetiva, 
          salarioLiquido: this.salarioLiquido
          //demonstrativoVisivel: false
        };

      this.dadosTrabalhadorService.setDados(trabalhador);

    }


  resultado: any = null;


    onSubmit() {
      this.resultado = {
        empregador: this.empregadorSelecionado,
        trabalhador: this.trabalhadorSelecionado,
        salario: this.salarioFormControl.value,
        data: this.date.value?.format('MM/YYYY')
      };
    }
    
    constructor(private dadosTrabalhadorService: DadosTrabalhadorService) {}
    // muda estado do demonstrativo para visível
    onClick(){

      this.mostrarConteudoPDF()

    }

async printPDF() {
  //this.demonstrativoVisivel = true;
  const pdf = new jsPDF('p', 'pt', 'a4');

    // Aguarda 1 segundo antes de continuar
  await new Promise(resolve => setTimeout(resolve, 50));

  // 1. Adiciona o conteúdo principal (conteudoPDF) usando pdf.html
  await pdf.html(this.conteudoPDF.nativeElement, {
    html2canvas: { scale: 0.6 },
    margin: [15, 10, 10, 20],
    autoPaging: 'text',
    x: 0,
    y: 0,
    callback: async (pdf) => {
      // 2. Após o conteúdo principal, adiciona uma nova página para o recibo (divRecibo)
      // pdf.addPage();

      // Usa html2canvas para capturar a div demonstrativo como imagem
      const canvas = await html2canvas(this.divRecibo.nativeElement, { scale: 1 });
      const imgData = canvas.toDataURL('image/png');

      // Calcula o tamanho da imagem para caber na página
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Centraliza verticalmente se desejar
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(
        imgData, 
        'PNG', 
        525, 
        225, 
        225, 
        35,
        undefined,
        'SLOW',
        90
      );

      pdf.addImage(
        imgData, 
        'PNG', 
        525, 
        525, 
        225, 
        35,
        undefined,
        'SLOW',
        90
      );


      // Salva o PDF
      pdf.save(`${this.trabalhadorSelecionado}_${this.hoje.month()}_${this.hoje.year()}.pdf`);
    }
  });

  await new Promise(resolve => setTimeout(resolve, 50)); // espera 0,05 segundos antes de executar próxima linha
    this.ocultarConteudoPDF() 
}




ocultarConteudoPDF() {
  this.conteudoPDF.nativeElement.hidden = true; // Oculta
  this.divRecibo.nativeElement.hidden = true; // Oculta
}

mostrarConteudoPDF() {
  this.conteudoPDF.nativeElement.hidden = false; // Mostra
   this.divRecibo.nativeElement.hidden = false; // Mostra
}



}