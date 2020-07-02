import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario:Usuario
  usuarios:Usuario[];
  token: string;
  total:number;

  constructor(public http:HttpClient, private _router: Router, private _subirarchivo: SubirArchivoService) {
    console.log('servicio listo de usuarios');
    this.cargarStorage();
   }

   estalogeado(){
     return (this.token.length>5)?true:false;
   }


   logout(){
     this.usuario=null;
     this.token='';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this._router.navigate(['/login']);
   }
   
   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token= localStorage.getItem('token');
       this.usuario= JSON.parse(localStorage.getItem('usuario'));

     }else{
       this.token='';
       this.usuario= null;
     }
   }


   crearUsuario(usuario:Usuario){
     let url =URL_SERVICIOS+'/usuario';
     return this.http.post(url,usuario).pipe(map((resp:any)=>{
      Swal.fire('Usuario creado', resp.email,'success');
       return resp.usuario;
     }));

   }

   loginGoogle(token: string){
    let url= URL_SERVICIOS +'/login/google';
    return this.http.post(url,{token}).pipe(map((resp:any)=>{
       console.log(resp.usuario);
       this.guardarStorage(resp.id, resp.token, resp.usuario);
       return true;
    }));

   }

   loginUsuario(usuario:Usuario, recordar:boolean=false){
     let url= URL_SERVICIOS +'/login';
     return this.http.post(url,usuario).pipe(map((resp:any)=>{
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return resp;
     }));
   }

   guardarStorage(id:string, token: string, usuario:Usuario ){

    localStorage.setItem('id', id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario=usuario;
    console.log(this.usuario);
    this.token=token;

   }

   actualizarUsuario(usuario:Usuario){
     let url =URL_SERVICIOS+'/usuario/'+ usuario._id;
     url+='?token='+this.token;

    return this.http.put(url,usuario).pipe(map((resp:any)=>{
      if(resp.ok){
        let usuarioDB:Usuario=resp.usuario;
        this.guardarStorage(usuarioDB._id,this.token,usuarioDB);
        let mensajeUsuario=`El usuario ${resp.usuario.email} se actualizo correctamente `;
        Swal.fire(mensajeUsuario,resp.email,'success');
        return true;
      }
    }));

   }

   cambiarImagen(file:File, id:string){
  this._subirarchivo.subirArchivo(file,'usuarios',id).then((resp:any)=>{

    this.usuario.img=resp.usuario.img;
    Swal.fire('imagen actualizada',this.usuario.nombre, 'success');
    this.guardarStorage(id,this.token,this.usuario);

    console.log(resp);
  }).catch(resp=>{
    console.log(resp);
  })
   }

   obtenerUsuarios(desde:number=0){
    let url =URL_SERVICIOS+'/usuario';
    url+='?desde='+desde;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.usuarios=resp.usuarios;
      this.total=resp.length;
      console.log(resp);
    }))
   }


}
