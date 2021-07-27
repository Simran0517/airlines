import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InteractionService} from '../../interaction.service';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { FormControl, Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Input } from '@angular/core';
import {formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ViewChild, ElementRef } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
// import { ChangeDetectionStrategy} from '@angular/core';
   

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})

export class CheckinComponent implements OnInit {
  clicked = false;
  data:any;
  checkSameValue=4;
  hidingClass: string = '';
  showSeatMapDisable=false;
  showSeatMapSpecialDisable=false;
  passengerSeat:any=[];
  showModal: boolean;
  showModalSpecial:boolean;
  dataFlight=false;
  dataSource = new MatTableDataSource();
  newdata:any=[];
  seatArray:any=[];
  dt = new Date();
  newdt=new Date();
  newSeat:any=[];
  newSeats:any=[];
  specialSeat:any=[];
  newPassenger:any=[];
  newSpecialSeat:any=[];
  passengerTrueNull:any=[];
  passengerFalseNull:any=[];
  passengerWheel:any=[];
  passengerFalseWheel:any=[];
  passengerInfant:any=[];
  passengerFalseInfant:any=[];
  public fid:number;
  public pid:number;
  specials:any=[];
  public sid:number;
  newpassengerArrayFalse:any=[];
  newPassengerArray:any=[];
  displayedColumns: string[] = ['id','flightName','departureTime','departureFrom','arrivalTime','seatmap','special','details'];
  constructor(private http: HttpClient, private _interactionService:InteractionService,private formBuilder: FormBuilder,private dialog:MatDialog,private router:Router) {
   }
  //  @ViewChild('submitButton') submitButton:ElementRef;
  ngOnInit() {
    this.http.get<string[]>('http://localhost:3000/flights').subscribe(x=>{this.data=x;
  })
}
getFlight(time){
 
 console.log(this.newdt);
    if(time=="All")
    {
    let newdata=[];
    for(let k = 0; k < this.data.length; k++)
    {
    //  newdata.length=1;
    this.dataFlight=true;
        newdata.push(this.data[k]);
        this.dataSource.data=newdata;
  }
}
   else if(time=="-2"){
    let newdata=[];
    for(let k = 0; k < this.data.length; k++)
      {
        
      this.dataFlight=true;
      this.data.sort(custom_sort);
      console.log(this.data)
          newdata.push(this.data[k]);
          this.dataSource.data=newdata;
    }
 
   }   

   function custom_sort(a, b) {
    return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
}
  
}
logOut(){
  this.router.navigate(['/login']);
}

hide()
{
  this.showModal = false;
 

}
goInflight(){
  this.router.navigate(['/air']);
}

hide2(){
  this.showModalSpecial=false;
}

onSelected(event,val){
  this.pid=val.id;
  console.log(this.pid);
  this._interactionService.sendFlightId(this.pid);
  
  }

showSeatMap(event,val){
  this.showModal = true;
  this.showSeatMapDisable=true;
  this.fid=val.id;
  this.http.get<string[]>('http://localhost:3000/flights?id='+this.fid).subscribe(x=>{this.newdata=x;
  this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.fid).subscribe(x=>{this.passengerSeat=x;
this.newPassenger=this.passengerSeat;
let trueNull:any=[];
let falseNull:any=[];
let trueWheel:any=[];
let falseWheel:any=[];
let trueInfant:any=[];
let falseInfant:any=[];

for(let i=0;i<this.passengerSeat.length;i++)
{
  if(this.passengerSeat[i].checkin=='true')
  {
    trueNull.push(this.passengerSeat[i].seatno)
  }
  else if(this.passengerSeat[i].checkin=='false'
  )
  {
    falseNull.push(this.passengerSeat[i].seatno)
  }
 
}



this.passengerTrueNull=trueNull;
this.passengerFalseNull=falseNull;

this.passengerFalseWheel=falseWheel;

this.passengerFalseInfant=falseInfant;
  let seatArray:any=[];
  // let new:any=[];
  let newAnother=[];
  let another:any=[];
    for(let i=0;i<this.newdata[0].seats.length;i++)
    {
      seatArray.push(this.newdata[0].seats[i])
    }
  this.newSeat=seatArray
  })})}
displayCondition(checkValue, elementValue) {
  if(this.checkSameValue == checkValue) {
    return false;
  }
  if(checkValue == elementValue) {
    this.checkSameValue = checkValue;
    return true;
  }
}


changeStatus(tile){
 
    for(let i=0;i<this.newPassenger.length;i++)

    { 
      let statusId=this.newSeat.indexOf(tile);
      let body = document.getElementsByTagName('mat-grid-tile')[statusId];
      if(this.newPassenger[i].seatno==tile && body.classList.contains("true-null")){
      
     
      
        this.newPassenger[i].checkin="false"
        body.classList.remove("true-null");
        let id=this.newPassenger[i].id;
        this._interactionService.changeStatus(this.newPassenger[i],id).subscribe(data => {
          console.log(this.newPassenger[i])
          return body.classList.add("false-null");
             });
      }
      else if(this.newPassenger[i].seatno==tile && body.classList.contains("false-null"))
    {
      this.newPassenger[i].checkin="true"
      body.classList.remove("false-null");
      let id=this.newPassenger[i].id;
      this._interactionService.changeStatus(this.newPassenger[i],id).subscribe(data => {
        console.log(this.newPassenger[i])
        
        return body.classList.add("true-null");
           });
    }
  
    }
  
}

show(event,val){
  this.showModalSpecial = true;
  this.showSeatMapSpecialDisable=true;
  this.sid=val.id;
  console.log("hi")
  this.http.get<string[]>('http://localhost:3000/flights?id='+this.sid).subscribe(x=>{this.specials=x;
  this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.sid).subscribe(x=>{this.specialSeat=x;
  this.newSpecialSeat=this.specialSeat;
  let trueWheel:any=[];
  let trueInfant:any=[];

  for(let i=0;i<this.specialSeat.length;i++)
{
  if(this.specialSeat[i].otherCategory=='wheel chair')
  {
    trueWheel.push(this.specialSeat[i].seatno)
  }

  else if(this.specialSeat[i].otherCategory=='with infant')
  {
    trueInfant.push(this.specialSeat[i].seatno)
  }
 
}

let seatArray:any=[];
  // let new:any=[];
  let newAnother=[];
  let another:any=[];
    for(let i=0;i<this.specials[0].seats.length;i++)
    {
      seatArray.push(this.specials[0].seats[i])
    }
  this.newSeats=seatArray
this.passengerWheel=trueWheel;

this.passengerInfant=trueInfant;

})})


}


}
