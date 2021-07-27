import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, RequiredValidator } from '@angular/forms';
// import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { SocialUser } from "angularx-social-login"

import { ChangeDetectionStrategy} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  gapi:any;
  auth2:any;
  user: SocialUser;
  loggedIn: boolean;

   profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
message:any;
   socialPlatformProvider:any;
data:any;
  constructor(private router:Router,private authService: SocialAuthService) { }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  public socialSignIn(socialPlatform : string) {
  
    if(socialPlatform == "google"){
      this.socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    }
    
    this.authService.signIn(this.socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        console.log(userData.idToken);
         this.router.navigate(['admin']);
         
               
        // Now sign-in with userData
        // ...
            
      }
    );
  }
log(){
  this.authService.signOut().then(() => {
  window.location.assign('https://accounts.google.com/Logout');
}, (error) => {
  console.log(error);
});
}
  
          
      logout(){
       
        document.location.assign('https://appengine.google.com/_ah/logout?continue=http://localhost:4200/login');
      }
    
  

  ngOnInit() {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  



    
  }
  onSubmit() {
  
  
  this.message=this.profileForm.value;
  console.log("hi")
  if(this.message.firstName=="admin" && this.message.lastName=="admin")
  { 

  
    this.router.navigate(['/admin']);

   
  }   
  
  else if(this.message.firstName=="air" && this.message.lastName=="air")
  {
    this.router.navigate(['/air']);
    this.data=this.message.firstName+" page";
    console.log(this.data);
  }
  
  
  }
  }
