import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario:Usuario;
  constructor(public _usuarioservice: UsuarioService) { }

  ngOnInit() {
    this.usuario=this._usuarioservice.usuario;
  }

}
