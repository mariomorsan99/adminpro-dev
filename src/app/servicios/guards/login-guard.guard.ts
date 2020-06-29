import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private _usuarioservice: UsuarioService, private router: Router){}

  canActivate(){
    console.log('login guard');
    if(this._usuarioservice.estalogeado()){
      console.log('paso guard');
     return true
    }else{
      console.log('blokeado guard');
      this.router.navigate(['/login']);
     return false;
    }
  }
  
}
