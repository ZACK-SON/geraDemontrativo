import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesAnoExtenso',
  standalone: true
})
export class MesAnoExtensoPipe implements PipeTransform {

  private meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  transform(value: string): string {
    if (!value) return '';
    const [mes, ano] = value.split('/');
    const mesIndex = parseInt(mes, 10) - 1;
    if (mesIndex < 0 || mesIndex > 11 || !ano) return value;
    return `${this.meses[mesIndex]} de ${ano}`;
  }

}
