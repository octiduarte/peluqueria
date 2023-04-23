import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JefeComponent } from './components/jefe/jefe.component';
import { Local1Component } from './components/local1/local1.component';
import { Local2Component } from './components/local2/local2.component';

const routes: Routes = [
  {path: '' , redirectTo : 'inicio' ,pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: JefeComponent},
  {path: 'local1' , component: Local1Component},
  {path: 'local2', component: Local2Component}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
