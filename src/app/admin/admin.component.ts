import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InteractionService} from '../interaction.service';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { FormControl, Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Input } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() control: FormControl;
  title = 'flights';
  items:any=[];

  str:any;
  nullValue="null";
  addPassengerDisable=false;
  addService=false;
  deleteService=false;
  newdata:any = [];
  newPassengers:any[];
  id:number;
  ancillaryArray1:any=[];
  shoppingArray1:any=[];
  mealArray1:any=[];
  newArray:any=[];
  newAncillary:any=[];
   finalseat:any=[];
   finalseatArray:any=[];
  datanumber:number ;
 resultArray:any=[];
 mealArray:any=[];
 shoppingArray:any=[];
 seatArray:any=[];
  profileForm: FormGroup;
  addServiceForm:FormGroup;
  deleteServiceForm:FormGroup;
  ancillaryForm:FormGroup;
  newForm:FormArray;
resultData:any=[];
uncheck = false;
   datanew:any = [];
   missing:any=[];
   missingAncillary:any=[];
   missingShopping:any=[];
   missingMeals:any=[];
   deleteAncillary:any=[];
   deleteShopping:any=[];
   deleteMeals:any=[];
   submitted = false;
  selected="all";
   showModal: boolean;
   showServiceModal: boolean;
   deleteServiceModal:boolean;
   defaultValue="null";
   public fid:number;
   public sid:number;
   public did:number;
   ancillaryServices:FormArray
   
  
   displayedColumns: string[] = ['flightId','flightName','departureTime','departureFrom','arrivalTime','arrivalTo','price','details','addPassenger','services'];

   
  constructor(private http: HttpClient, private _interactionService:InteractionService,private formBuilder: FormBuilder,private dialog:MatDialog,private router:Router,private authService: SocialAuthService) { 
    


    this.addServiceForm = this.formBuilder.group({  
      
      ancillaryServices:new FormControl([]),
      inFlightServices:new FormControl([]),
      specialMeals:new FormControl([])
  
    })

    this.deleteServiceForm = this.formBuilder.group({  
      
      ancillaryServices:this.formBuilder.array([]),
      inFlightServices:this.formBuilder.array([]),
      specialMeals:this.formBuilder.array([])
  
    })
    this.ancillaryForm = this.formBuilder.group({
      ancillaryServices: this.formBuilder.array([])
  });



  
  
    
  }

  hide()
  {
    // this.profileForm.reset();
    // this.addServiceForm.reset();
    // this.deleteServiceForm.reset();
    this.showModal = false;
    this.showServiceModal=false;
    this.deleteServiceModal=false;
  }


  log(){
    this.authService.signOut().then(() => {
    window.location.assign('https://accounts.google.com/Logout');
  }, (error) => {
    console.log(error);
  });
  this.router.navigate(['/login']);
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return InteractionService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }

  ngOnInit(){
    this.http.get<string[]>('http://localhost:3000/flights').subscribe(x=>{this.datanew=x;
    console.log(this.datanew)
    
  }
    ) 
    

    
    this._interactionService.flightmessagepassenger$.subscribe(message=>{
   this.id=message;
   console.log(this.id)
   this.http.get<string[]>('http://localhost:3000/flights?id='+this.id).subscribe(x=>{this.newdata=x;
        this.resultArray=this.newdata[0].ancillaryServices;
        this.mealArray=this.newdata[0].specialMeals;
        this.shoppingArray=this.newdata[0].inFlightServices;
        // (this.resultArray[0].ancillaryServices);
      this.seatArray=this.newdata[0].seats;
      console.log(this.seatArray);


      this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.id).subscribe(x=>{this.newPassengers=x;
     




      
      
      this.newPassengers.forEach((el) => {
      let seatArrayNew:any=[];
      {
        seatArrayNew.push(el.seatno);
      }  
      this.newArray.push(seatArrayNew);
     
      }
      


      );

      
       function comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            return other == current
          }).length == 0;
        }
      }
      
     this.missing = this.seatArray.filter(comparer(this.newArray));
    })
    // this.newArray =[];
    // this.finalseat=[];
    })
}
)
    }
    

onSelected(event,val){
this.fid=val.id;
console.log(this.fid);
this._interactionService.sendFlightId(this.fid);

}

addPassenger(event,val){



  this.profileForm = this.formBuilder.group({  
    cname: new FormControl('',Validators.required),
    flightId: [''],
   checkin:new FormControl('', Validators.required),
    passport:[''],
    address:[''],
    dob:[''],
    category:['',Validators.required],
    ancillaryService:this.formBuilder.array([]),
    otherCategory:[''],
    seatno:['',Validators.required],
    meal:[''],
    shop:this.formBuilder.array([]),

  })
  
  this.showModal = true;
  this.addPassengerDisable=true;
  this.fid=val.id;

this._interactionService.sendFlightIdForPassenger(this.fid);

}
addServices(event,val){
  
  this.showServiceModal = true;
  this.addService=true;
  this.sid=val.id;
  console.log(this.sid)
 

}


deleteServices(event,val){
  
  this.deleteServiceModal = true;
  this.deleteService=true;
  this.did=val.id;
  console.log(this.did)
  this.http.get<string[]>('http://localhost:3000/flights?id='+this.did).subscribe(x=>{this.resultData=x;
  this.ancillaryArray1=this.resultData[0].ancillaryServices;
  this.shoppingArray1=this.resultData[0].inFlightServices;
  this.mealArray1=this.resultData[0].specialMeals;
  
 
  })
}



get f() { return this.profileForm.controls; }
onAddService(event,sid){
  this.http.get<string[]>('http://localhost:3000/flights?id='+sid).subscribe(x=>{this.newdata=x;
let ancillary=this.addServiceForm.value.ancillaryServices
let shoppingitem=this.addServiceForm.value.inFlightServices
let meals=this.addServiceForm.value.specialMeals
if(ancillary==""){this.resultArray=this.newdata[0]}
else{this.newdata[0].ancillaryServices.push(ancillary)
this.resultArray=this.newdata[0]}
if(shoppingitem==""){this.resultArray=this.newdata[0]}
else{this.newdata[0].inFlightServices.push(shoppingitem)
this.resultArray=this.newdata[0]}
if(meals==""){this.resultArray=this.newdata[0]}
else{this.newdata[0].specialMeals.push(meals)
this.resultArray=this.newdata[0]}
 this._interactionService.addService(this.resultArray,sid).subscribe(data => {
    alert("Services Added successfully")  
        this.addServiceForm.reset();
        this.showServiceModal = false;

      })
  });

}
logOut(){
  this.router.navigate(['/login']);
}



onDeleteService(event,did){
  this.http.get<string[]>('http://localhost:3000/flights?id='+did).subscribe(x=>{this.newdata=x;
  function comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other == current
      }).length == 0;
    }
  }
  this.missingAncillary = this.newdata[0].ancillaryServices.filter(comparer(this.deleteServiceForm.value.ancillaryServices));
  this.missingShopping = this.newdata[0].inFlightServices.filter(comparer(this.deleteServiceForm.value.inFlightServices));
  this.missingMeals = this.newdata[0].specialMeals.filter(comparer(this.deleteServiceForm.value.specialMeals));
this.newdata[0].ancillaryServices.splice(0,this.newdata[0].ancillaryServices.length)
this.newdata[0].inFlightServices.splice(0,this.newdata[0].inFlightServices.length)
this.newdata[0].specialMeals.splice(0,this.newdata[0].specialMeals.length)
for(var i=0;i<this.missingAncillary.length;i++){
  this.newdata[0].ancillaryServices.push(this.missingAncillary[i]);
}
for(var i=0;i<this.missingMeals.length;i++){
  this.newdata[0].specialMeals.push(this.missingMeals[i]);
}
for(var i=0;i<this.missingShopping.length;i++){
  this.newdata[0].inFlightServices.push(this.missingShopping[i]);
}
 this._interactionService.addService(this.newdata[0],did).subscribe(data => {
    alert("Services Deleted successfully")  
        this.deleteServiceForm.reset();
        this.deleteServiceModal = false;
      })

    })
  

}
 onSubmit() {
  this.submitted = true;


  if(this.profileForm.value.passport===""){
this.profileForm.get('passport').setValue(this.nullValue);
  }
  if(this.profileForm.value.dob===""){
this.profileForm.get('dob').setValue(this.nullValue);
  }
  if(this.profileForm.value.address===""){
this.profileForm.get('address').setValue(this.nullValue);
  }
  this._interactionService.create(this.profileForm.value).subscribe(data => {
    alert("Passenger Added successfully")  
        this.profileForm.reset();
        this.showModal = false;
        this.uncheck = false;
  });
 }
 onCheckboxChange(e) {
  const checkArray: FormArray = this.profileForm.get('ancillaryService') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
 
}

onCheckboxChangeAncillary(e) {
  const checkArray: FormArray = this.deleteServiceForm.get('ancillaryServices') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}
onCheckboxChangeShopping(e) {
  const checkArray: FormArray = this.deleteServiceForm.get('inFlightServices') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

onCheckboxChangeMeal(e) {
  const checkArray: FormArray = this.deleteServiceForm.get('specialMeals') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}



onCheckboxChanges(e) {
  const checkArray: FormArray = this.profileForm.get('shop') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}
 
}
