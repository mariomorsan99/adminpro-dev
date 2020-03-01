import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/servicios/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  expanded: boolean = false;
  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

  seleccionMenu() {
  let submenu=document.getElementsByClassName('ulSubmenu');
  for (let index = 0; index < submenu.length; index++) {
    const element = submenu[index];
    console.log(element);
    element.classList.remove('collapse');
  }

  }
}
