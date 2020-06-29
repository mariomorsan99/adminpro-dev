import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './servicios/guards/login-guard.guard';



const AppRoutes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    canActivate:[LoginGuardGuard],
    children: [ 
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent },
      {path: 'garfica1', component: Graficas1Component },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, 
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent }  
];

export const APP_ROUTES = RouterModule.forRoot(AppRoutes, {useHash: true });
