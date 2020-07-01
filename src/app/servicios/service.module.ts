import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';


import{
UsuarioService, LoginGuardGuard
} from './service.index'



@NgModule({
    declarations: [],
    imports: [ CommonModule, HttpClientModule ],
    exports: [],
    providers: [UsuarioService, LoginGuardGuard, SubirArchivoService],
})
export class ServiceModule {}
