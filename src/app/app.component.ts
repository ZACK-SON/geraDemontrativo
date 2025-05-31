import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
template: ` 

  <router-outlet></router-outlet>
  <app-selecao-trabalhador></app-selecao-trabalhador>
  <!-- <app-demonstrativo></app-demonstrativo> -->

` 
})
export class AppComponent {
  title = 'demonstrativoPagamento';
}
