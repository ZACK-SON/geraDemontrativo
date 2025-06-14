import { TestBed } from '@angular/core/testing';

import { DemonstrativoVisivelService } from './demonstrativo-visivel.service';

describe('DemonstrativoVisivelService', () => {
  let service: DemonstrativoVisivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonstrativoVisivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
