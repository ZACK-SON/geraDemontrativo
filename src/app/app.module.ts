import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelecaoTrabalhadorComponent } from './components/selecao-trabalhador/selecao-trabalhador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DemonstrativoComponent } from './components/demonstrativo/demonstrativo.component';
import { MesAnoExtensoPipe } from './mes-ano-extenso.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SelecaoTrabalhadorComponent,
    DemonstrativoComponent,
    MesAnoExtensoPipe

  ],
  exports: [
 
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
