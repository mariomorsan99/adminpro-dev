import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { ChartsModule } from 'ng2-charts';
import { DonutsComponent } from '../components/donuts/donuts.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { BrowserModule } from '@angular/platform-browser';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
@NgModule({
   declarations: [
       PagesComponent,
       DashboardComponent,
       ProgressComponent,
       Graficas1Component,
       IncrementadorComponent,
       DonutsComponent,
       AccountSettingComponent,
       PromesasComponent,
       RxjsComponent
   ],
   exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    DonutsComponent
   ],
   imports: [
       SharedModule,
       PAGES_ROUTES,
       FormsModule,
       ChartsModule,
       BrowserModule
   ]
})

export class PageModule { }