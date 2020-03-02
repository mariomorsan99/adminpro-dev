import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo: string;
  constructor(private router: Router, private title: Title) {
    
    this.getDataRoute().subscribe(data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle(data.titulo);
    });
   }

  ngOnInit() {
  }

  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(  (evento: ActivationEnd) => evento.snapshot.data )

     )
  }


}
