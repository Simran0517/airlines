import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
// import { FormGroup, FormBuilder } from  '@angular/forms';
import { FormArray} from '@angular/forms';
import { InteractionService } from '../../../interaction.service';
import { combineAll } from 'rxjs/operators';
import { ChangeDetectionStrategy} from '@angular/core';
@Component({
  selector: 'app-passenger-services',
  templateUrl: './passenger-services.component.html',
  styleUrls: ['./passenger-services.component.css']
})
export class PassengerServicesComponent implements OnInit {
  submitted=false;
  updatePassengerDisable=false;
  public pid:number;
  showMeal:boolean;
  updateMeal=false;

  passengerId:number;
  profileForm: FormGroup;
  shopForm: FormGroup;
  passengerData:any;
  passengerValue:any;
    newdata:any = [];
    newdata1:any=[];
    newseat:any=[];
    resultArray:any;
    newAncillary:any=[];
    showModal: boolean;
    showShop:boolean;
    flightAncillary:any=[];
    passengerAncillary:any=[];
    mealArray2:any=[];
    missingMeal:any=[];
    mealArray:any=[];
    flightMeal:any=[];
    newMeal:any=[];
    showSeatMapSpecialDisable=false;
    showAncillary: boolean;
    id:number;
    flightId:number;
    seatArray:any=[];
    newArray:any=[];
    missing:any=[];
    deleteServiceForm:FormGroup;
    seatnumber:any;
    ancillary:number;
    newPassengers:any=[];
     displayedNewdata=false;
     filterValues = {};
     dataSource = new MatTableDataSource();
    data:number ;
    displayedColumns: string[] = ['id','cname','seatno','ancillary','meal','add ancillary','change meal','in flight shop'];
    filterSelectObj = [];
    constructor(private http: HttpClient,private _interactionService:InteractionService,private formBuilder: FormBuilder,) {
      this.deleteServiceForm = this.formBuilder.group({  
      
        ancillaryServices:this.formBuilder.array([])
    
      })
      this.profileForm = this.formBuilder.group({  
        meal: new FormControl('',Validators.required),
      })
      this.shopForm = this.formBuilder.group({  
      
        shop:this.formBuilder.array([])
    
      })
    }
    ngOnInit() {
      this._interactionService.flightmessage$.subscribe(message=>{
        if(message!=null)
        {
         this.id=message;
          this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.id).subscribe(x=>{this.newdata=x;
          this.resultArray=this.newdata;
          this.dataSource.data = this.resultArray;
          console.log(this.newdata)
        })
        
      }
    })
    
    
    }

    addAncillary(event,val){
      this.ancillary=val.flightId;
      this.passengerId=val.id;
      console.log(this.ancillary)
      this.showAncillary=true;
      this.showSeatMapSpecialDisable==true;
      this.http.get<string[]>('http://localhost:3000/flights?id='+this.ancillary).subscribe(x=>{this.newdata=x;
        this.resultArray=this.newdata[0].ancillaryServices;
console.log(this.resultArray);
this.http.get<string[]>('http://localhost:3000/passengers?id='+this.passengerId).subscribe(x=>{this.newdata1=x;
this.passengerAncillary=this.newdata1[0].ancillaryService;
console.log(this.passengerAncillary)
function comparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other == current
    }).length == 0;
  }
}
console.log(this.deleteServiceForm.value);


this.missing = this.resultArray.filter(comparer(this.passengerAncillary));
console.log(this.missing);
// this.passengerAncillary.ancillaryService.push(this.missing);
console.log(this.passengerAncillary)

    })
  })
    }

    onDeleteService(event,x){

      let body = document.getElementsByClassName('check')

     console.log(this.deleteServiceForm.value.ancillaryServices[0]);
     this.id=x;
     console.log(this.newdata1);
     for(let i=0;i<this.deleteServiceForm.value.ancillaryServices.length;i++)
     {
       if(this.deleteServiceForm.value.ancillaryServices[i]!=null){
      this.newdata1[0].ancillaryService.push(this.deleteServiceForm.value.ancillaryServices[i]);
       }
     }
    
     console.log(this.newdata1)
     this._interactionService.addPassengerAncillary(this.newdata1[0],this.id).subscribe(data => {
        alert("Ancillary Services Added Successfully")  
            this.deleteServiceForm.reset();
            this.showAncillary = false;
           
          })
    

      
    
    }
    onCheckboxChangeAncillary(e) {
      const checkArray: FormArray = this.deleteServiceForm.get('ancillaryServices') as FormArray;
    
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
        
      // } else {
      //   let i: number = 0;
      //   checkArray.controls.forEach((item: FormControl) => {
      //     if (item.value == e.target.value) {
      //       checkArray.removeAt(i);
      //       return;
      //     }
      //     i++;
      //   });
        
      }
      
    }
    onCheckboxChangeShop(e) {
      const checkArray: FormArray = this.shopForm.get('shop') as FormArray;
    
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
        

        
      }
      
    }
    

    hide(){
this.showAncillary=false;
this.showModal=false;
this.showMeal=false;
this.showShop=false;
    }

    onSubmit(event) {

      this.submitted = true;
      this._interactionService.updatePassenger(this.profileForm.value,this.pid).subscribe(data => {
  
        console.log(this.profileForm.value)
        alert("Passenger Updated Successfully")  
            this.profileForm.reset();
           
            this.showMeal = false;
          
         
      });
    }
  
    changeMeal(event,val){


      
      this.showMeal = true;
      this.updateMeal==true;
      this.pid=val.id;
      this.flightId=val.flightId;
      console.log(this.pid);
      console.log(this.flightId)
  
      this.http.get<string[]>('http://localhost:3000/flights?id='+this.flightId).subscribe(x=>{this.flightMeal=x;
          
        this.mealArray=this.flightMeal[0].specialMeals;
        console.log(this.resultArray);
  
        this.http.get<string[]>('http://localhost:3000/passengers?id='+this.pid).subscribe(x=>{this.newMeal=x;
    
  
      });
    });
        
        // console.log(this.deleteServiceForm.value);
        
        
      
   
    }


    inFlight(event,val){


      
      this.showShop = true;
      // this.updateMeal==true;
      this.pid=val.id;
      this.flightId=val.flightId;
      console.log(this.pid);
      console.log(this.flightId)
  
      this.http.get<string[]>('http://localhost:3000/flights?id='+this.flightId).subscribe(x=>{this.flightMeal=x;
          
        this.mealArray=this.flightMeal[0].inFlightServices;
        console.log(this.mealArray);
  
        this.http.get<string[]>('http://localhost:3000/passengers?id='+this.pid).subscribe(x=>{this.newMeal=x;
    
        this.mealArray2=this.newMeal[0].shop;
        console.log(this.mealArray2);
        function comparer(otherArray){
          return function(current){
            return otherArray.filter(function(other){
              return other == current
            }).length == 0;
          }
        }
        console.log(this.deleteServiceForm.value);
        
        
        this.missing = this.mealArray.filter(comparer(this.mealArray2));
        console.log(this.missing)


      });
    });

   
        
        // console.log(this.deleteServiceForm.value);
        
        
      
   
    }

    addItems(event,x){
     this.pid=x;
     console.log(this.pid)
     console.log(this.shopForm.value)

     this.http.get<string[]>('http://localhost:3000/passengers?id='+this.pid).subscribe(x=>{this.newMeal=x;
   
     for(let i=0;i<this.shopForm.value.shop.length;i++)
     {
       if(this.shopForm.value.shop[i]!=null){
      this.newMeal[0].shop.push(this.shopForm.value.shop[i]);
       }
     }
    
     console.log(this.newMeal)
     this._interactionService.addPassengerAncillary(this.newMeal[0],this.pid).subscribe(data => {
        alert("Items Added Successfully")  
            this.shopForm.reset();
            this.showShop = false;
           
          })
        })
    

    }




}
