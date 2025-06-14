import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemonstrativoVisivelService {

    private demonstrativoVisivel = new BehaviorSubject<boolean>(
  
      false 
     
    );
  
  
  
  
    setDados(visivel: boolean) {
      this.demonstrativoVisivel.next(visivel);
    }
  
    getDados() {
      return this.demonstrativoVisivel.asObservable();
    }

  constructor() { }
}
