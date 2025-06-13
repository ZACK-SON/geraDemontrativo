import { Component, inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

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



export class SelecaoTrabalhadorComponent implements OnInit {

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
  }


  // input
  salarioFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  empregadores: any[] = [];
  trabalhadores: any[] = [];
  empregadorSelecionado: any = null;


  trabalhadorSelecionado: any = null;
  salarioTrabalhadorSelecionado: any = null;
  matriculaTrabalhadorSelecionada: any = null;


   #http = inject(HttpClient);

  public getDadosEmpregadores(){
    this.#http.get<any[]>('assets/json/empregadores.json').subscribe(data => {
        this.empregadores = data;
        //console.log('Empregadores:', this.empregadores);
      });
  }


  ngOnInit() {
    this.getDadosEmpregadores();
    //console.log('Empregador selecionado:', this.empregadorSelecionado);
    //moment.locale('pt-br');
  }


  // preenche o array de objetos this.trabalhadores do empregador selecionado
  onEmpregadorChange(event: any) {
    this.empregadorSelecionado = event.value;
    //console.log('Empregador selecionado:', this.empregadorSelecionado);

        for (let empregador of this.empregadores){
          if (empregador.nomeEmpregador === this.empregadorSelecionado) {
              this.trabalhadores = empregador.empregados
              
              //console.log('Trabalhador do empregador selecionado:', this.trabalhadores);

              for (let trabalhador of this.trabalhadores){
                  
                  //console.log('Trabalhadores do empregador selecionado:', trabalhador.nomeTrabalhador);
                  //console.log('Salário:', trabalhador.salario);
              }
          }
        }

      }

      constructor(private dadosTrabalhadorService: DadosTrabalhadorService) {}

    onTrabalhadorChange(event: any) {
      this.trabalhadorSelecionado  = event.value.nomeTrabalhador;  
      this.salarioTrabalhadorSelecionado = event.value.salario;
      this.matriculaTrabalhadorSelecionada = event.value.matricula;
      this.salarioFormControl.setValue(`R$ ${this.salarioTrabalhadorSelecionado},00`)
      //console.log('event:', event);
      //console.log('Trabalhador selecionado:', this.trabalhadorSelecionado);
      //console.log('Salário:', this.salarioTrabalhadorSelecionado);
      //console.log('Matrícula do trabalhador selecionado:', this.matriculaTrabalhadorSelecionada);

      // Para enviar dados para service:
      this.dadosTrabalhadorService.setDados(
        this.trabalhadorSelecionado, 
        this.matriculaTrabalhadorSelecionada, 
        this.salarioTrabalhadorSelecionado
      );

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
    
    // printPDF() {
    //     const pdf = new jsPDF('p', 'pt', 'a4');
    //     const recibo = this.divRecibo.nativeElement;

    //     pdf.html(this.conteudoPDF.nativeElement, {
    //       html2canvas: { scale: 0.6 }, // ajuste o valor conforme necessário
    //       margin: [15, 10, 10, 20],  // [top, left, bottom, right] em pixels
    //       callback: (pdf) => {
    //       pdf.save(`${this.trabalhadorSelecionado}_${this.hoje.month()}_${this.hoje.year()}.pdf`);
    //     }
    //   });    
    // }

async printPDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');

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

      // pdf.addImage(
      //     imageData,      // imagem em base64
      //     format,         // 'PNG', 'JPEG', etc.
      //     x,              // posição X (em pontos)
      //     y,              // posição Y (em pontos)
      //     width,          // largura da imagem
      //     height,         // altura da imagem
      //     alias?,         // opcional
      //     compression?,   // opcional
      //     rotation?       // rotação em graus (ex: 90, 180, 270)
      // );

      // Salva o PDF
      pdf.save(`${this.trabalhadorSelecionado}_${this.hoje.month()}_${this.hoje.year()}.pdf`);
    }
  });
}








}