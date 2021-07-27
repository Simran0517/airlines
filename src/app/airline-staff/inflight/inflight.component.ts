import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InteractionService} from '../../interaction.service';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { FormControl, Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Input } from '@angular/core';
import {formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

import { ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-inflight',
  templateUrl: './inflight.component.html',
  styleUrls: ['./inflight.component.css']
})
export class InflightComponent implements OnInit {
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
 veg:any=[];
 nonveg:any=[];
 special:any=[];
 other:any=[];
  public fid:number;
  public pid:number;
  specials:any=[];
  public sid:number;
  newpassengerArrayFalse:any=[];
  newPassengerArray:any=[];
  displayedColumns: string[] = ['id','flightName','ancillary','meals','inflight','map','details'];
  constructor(private http: HttpClient, private _interactionService:InteractionService,private formBuilder: FormBuilder,private dialog:MatDialog,private router:Router) {
   }
  //  @ViewChild('submitButton') submitButton:ElementRef;
  ngOnInit() {
    this.http.get<string[]>('http://localhost:3000/flights').subscribe(x=>{this.data=x;
    this.dataSource.data=this.data;
  })
}
hide()
{
  this.showModal = false;
 

}
goInflight(){
  this.router.navigate(['/air']);
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

  console.log("hi")
  this.http.get<string[]>('http://localhost:3000/flights?id='+this.fid).subscribe(x=>{this.specials=x;
  this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.fid).subscribe(x=>{this.specialSeat=x;
  this.newSpecialSeat=this.specialSeat;
  let veg:any=[];
  let nonveg:any=[];
  let special:any=[];
  let others:any=[];

  for(let i=0;i<this.specialSeat.length;i++)
{
  if(this.specialSeat[i].meal=='veg meal')
  {
    veg.push(this.specialSeat[i].seatno)
  }

  else if(this.specialSeat[i].meal=='non veg meal')
  {
    nonveg.push(this.specialSeat[i].seatno)
  }
  else if(this.specialSeat[i].meal=='special meal')
  {
    special.push(this.specialSeat[i].seatno)
  }
  else{
    others.push(this.specialSeat[i].seatno)
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
this.veg=veg;

this.nonveg=nonveg;
this.special=special;
this.other=others;

})})

}

logOut(){
  this.router.navigate(['/login']);
}

}
