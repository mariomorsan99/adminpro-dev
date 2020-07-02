import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]
  desde: number=0;
  totalRegistros=0;
  constructor(private _usuariosService: UsuarioService) { }

  ngOnInit() {
   this.cargarUsuarios();
    
  }

  cargarUsuarios(){
    this._usuariosService.obtenerUsuarios(this.desde).subscribe((resp:any)=>{
      console.log(this._usuariosService.usuarios);
      this.usuarios=this._usuariosService.usuarios;
      this.totalRegistros= this.usuarios.length;
      console.log(this.totalRegistros);
    });
  }

  CambiarDesde(valor:number){
    let desde=this.desde+valor;
    
    if(desde>=this.totalRegistros){
      return;
    }
    if(desde<0){
      return;
    }
    this.desde+=valor;
    this.cargarUsuarios();
  }

}
