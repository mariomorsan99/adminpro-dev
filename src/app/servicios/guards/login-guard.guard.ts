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
    if(this._usuarioservice.estalogeado()){
     return true
    }else{
      this.router.navigate(['/login']);
     return false;
    }
  }
  
}
