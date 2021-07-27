import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinComponent } from './airline-staff/checkin/checkin.component';
import { InflightComponent } from './airline-staff/inflight/inflight.component';
import { LoginComponent } from './login/login.component';
import { AirlineStaffComponent } from './airline-staff/airline-staff.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent, pathMatch:'full' },
      { path: 'admin', component: AdminComponent, pathMatch:'full' },
      { path: 'air', component: AirlineStaffComponent,pathMatch:'full' },
    {path:'checkin',component: CheckinComponent},
    {path:'inflight',component:InflightComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
