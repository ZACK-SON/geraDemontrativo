import { TestBed } from '@angular/core/testing';

import { DadosTrabalhadorService } from './dados-trabalhador.service';

describe('DadosTrabalhadorService', () => {
  let service: DadosTrabalhadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosTrabalhadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
