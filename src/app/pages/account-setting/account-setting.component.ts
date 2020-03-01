import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/servicios/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public ajustesServicio: SettingsService  ) { }

  

  ngOnInit() {
    this.colocarCheck();
  }

  ChangeThemes(theme: string, link: any) {
  console.log(theme);
  this.ApplyCheck(link);
  this.ajustesServicio.aplicarTema(theme);
  }

  ApplyCheck(link: any) {
  let selectores = document.getElementsByClassName('selector');
  for (let index = 0; index < selectores.length; index++) {
    const element = selectores[index];
    element.classList.remove('working');
  }
   link.classList.add('working');
  }

  colocarCheck() {
    const selectores = document.getElementsByClassName('selector');
    let tema= this.ajustesServicio.ajustes.tema;
    for (let index = 0; index < selectores.length; index++) {
      const element = selectores[index];
      if ( element.getAttribute('data-theme') === tema) {
           element.classList.add('working');
           break;
       }
    }

  }
}
