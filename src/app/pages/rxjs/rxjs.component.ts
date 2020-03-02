import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, from, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
 
  subcripcion: Subscription;

  constructor() {

    // this.regresaObservable().pipe(  
    //   retry(2)
    //  );

   this.subcripcion = this.regresaObservable().subscribe(
      numero => console.log('subscripcion', numero),
      error => console.log('error en el observable', error),
      () => console.log('el observador termina')
    );
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('salio de la pagina');
    this.subcripcion.unsubscribe();
    
  }

  regresaObservable(): Observable<any> {

    return  new Observable( (observer: Subscriber<any>) => {
      let contador=0;
      let interval = setInterval(() => {
        contador ++;

        const salida= {
          valor: contador
        }

        observer.next(salida);

        console.log(contador);

        if(contador === 3) {
          clearInterval(interval);
          observer.complete();
        }

      }, 1000);

    }).pipe(
      
      map(resp =>  resp.valor),
      filter( (valor, index) => {
      // console.log('valor:' + valor, 'indice:' + index);
      if (valor  === 1) {
         return true;
      }else {
        return false;
      }
      })
      
      );
   
  }
}
