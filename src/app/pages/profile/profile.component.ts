import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenSubir: File;
  imagenTemp:any;
  constructor(public _usuarioservice:UsuarioService) {
    this.usuario=_usuarioservice.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    console.log(usuario);
    this.usuario.nombre=usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email=usuario.email;
    }
    
    this._usuarioservice.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo:File){
    if(!archivo){
      this.imagenSubir=null;
    }

    if(archivo.type.indexOf('image')<0){
      Swal.fire('Solo imagenes', 'El archivo no es una imagen', 'error');
      this.imagenSubir=null;
      return;
    }

    this.imagenSubir=archivo;

    let reader= new FileReader();
    let urlImagenTemp= reader.readAsDataURL(archivo);
    //image in base64
    reader.onloadend=()=>{
      this.imagenTemp=reader.result;
      // console.log(this.imagenTemp);
    } 

    // console.log(this.imagenSubir);
    

  }

  cambiarImagen(){
    this._usuarioservice.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
