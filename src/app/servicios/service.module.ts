import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService} from '../servicios/service.index';

@NgModule({
  providers: [
    SettingsService, 
    SharedService,
    SidebarService
  ],
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
