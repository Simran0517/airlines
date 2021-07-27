import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-airline-staff',
  templateUrl: './airline-staff.component.html',
  styleUrls: ['./airline-staff.component.css']
})
export class AirlineStaffComponent {


  constructor(private router:Router,private authService: SocialAuthService){}
  logOut(){
    this.router.navigate(['/login']);
  }

  log(){
    this.authService.signOut().then(() => {
    window.location.assign('https://accounts.google.com/Logout');
  }, (error) => {
    console.log(error);
  });
  this.router.navigate(['/login']);
  }
}