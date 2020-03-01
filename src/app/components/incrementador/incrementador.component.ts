import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgres', { static: false}) txtProgres: ElementRef;

  @Input('nombre') leyenda: string = 'child';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValores: EventEmitter<number> = new EventEmitter();
  
  constructor() {
   }

  ngOnInit() {
  }

  onChance(newValue: number) {
  //  let elemHtml:any = document.getElementsByName('progreso')[0];
   if (newValue >= 100) {
     this.progreso = 100;
   } else if (newValue <= 0) {
      this.progreso = 0;
   } else {
    this.progreso = newValue;
   }

  //  elemHtml.value = this.progreso;
   this.txtProgres.nativeElement.value = this.progreso;

   this.cambioValores.emit(this.progreso);
  }
  cambiarValor(valor: any) {
    if (this.progreso >= 100 && valor > 100) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValores.emit(this.progreso);
    this.txtProgres.nativeElement.focus();
  }

}
