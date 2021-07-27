import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   loadedFeature = 'flight';
//  onNavigate(feature:string){
// this.loadedFeature=feature;
//  }

//  loadedFeatures = 'checkin';
//  onNavigation(feature:string){
//    this.loadedFeatures=feature;
//  }
// }
export class AppComponent  {
  name = 'Angular ';
  disabled=false;


  constructor(private router:Router){}

   ngOnInit(){
    this.router.navigate(['/login']);
  }

//   log(){
//     console.log("hi")
// this.disabled=true;
  // }

}
