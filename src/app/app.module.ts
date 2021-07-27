import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {HttpClientModule} from '@angular/common/http';
// import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { AirlineStaffComponent } from './airline-staff/airline-staff.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectedFlightComponent } from './admin/selected-flight/selected-flight.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';

import {MatDialogModule} from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckinComponent } from './airline-staff/checkin/checkin.component';
import { InflightComponent } from './airline-staff/inflight/inflight.component';
import { PassengerDetailsComponent } from './airline-staff/checkin/passenger-details/passenger-details.component';
import { PassengerServicesComponent } from './airline-staff/inflight/passenger-services/passenger-services.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';


import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent ,
    AirlineStaffComponent,
    SelectedFlightComponent,
    CheckinComponent,
    InflightComponent,
    PassengerDetailsComponent,
    PassengerServicesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
     CommonModule,
     SocialLoginModule,
     ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
],
  providers:[
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '22192785955-ipko8k8iloa0bhp2ulc8lnb537dmit7j.apps.googleusercontent.com'
            ),
          }
         
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SelectedFlightComponent
]
})
export class AppModule { }
