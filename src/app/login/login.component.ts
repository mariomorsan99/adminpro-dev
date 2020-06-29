import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent implements OnInit {

  recuerdame:boolean=false;
  auth2:any;

  constructor(public router:Router, public _usuarioservice: UsuarioService) { }

  ngOnInit() {
  this.googleInit();

  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2=gapi.auth2.init({
        client_id: '321073974474-g2pjakfd5qc00ur5bao9sb0klm2lvq2n.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element,{}, googleUser=>{
    //  let profile= googleUser.getBasicProfile();
     let token = googleUser.getAuthResponse().id_token;
     console.log(token);
     this._usuarioservice.loginGoogle(token).subscribe(result=>this.router.navigate(['/dashboard']));
    
    });
  }

  ingresar(forma:NgForm){
    console.log(forma.valid);
    console.log(forma.value);

    if(forma.invalid){
      return;
    }

    const {email, password} = forma.value;
    let usuario= new Usuario(null,email,password);
    this._usuarioservice.loginUsuario(usuario, this.recuerdame).subscribe(result=>{
       console.log(result);
       this.router.navigate(['/dashboard']);
    });
  }
}
