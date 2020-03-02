import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarSegundos().then(
      mensaje => console.log('termino', mensaje)
      ).catch(error=> console.error('error en la promesa', error));
   }

  ngOnInit() {
  }

  contarSegundos() {
    let promesa=new Promise( (resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('ok');
          clearInterval(interval);
        }
      }, 1000 );

    });
    return promesa;
  }

}
