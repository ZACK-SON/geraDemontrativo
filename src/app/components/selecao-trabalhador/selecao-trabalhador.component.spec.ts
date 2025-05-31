import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTrabalhadorComponent } from './selecao-trabalhador.component';

describe('SelecaoTrabalhadorComponent', () => {
  let component: SelecaoTrabalhadorComponent;
  let fixture: ComponentFixture<SelecaoTrabalhadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecaoTrabalhadorComponent]
    });
    fixture = TestBed.createComponent(SelecaoTrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
