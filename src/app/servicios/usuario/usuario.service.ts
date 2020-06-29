import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario:Usuario
  token: string;

  constructor(public http:HttpClient, private _router: Router) {
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
       console.log(resp);
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
    this.token=token;

   }


}
