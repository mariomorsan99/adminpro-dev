import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  usuario:Usuario;
  constructor(public _userservice: UsuarioService) { }

  ngOnInit() {
    this.usuario= this._userservice.usuario;
  }

  logout(){
    this._userservice.logout();
  }

}
