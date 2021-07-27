import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InteractionService } from '../../interaction.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import { ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.css']
})
export class SelectedFlightComponent implements OnInit {


// addPassengerDisable=false;
submitted=false;
updatePassengerDisable=false;
public pid:number;
profileForm: FormGroup;
passengerData:any;
passengerValue:any;
  newdata:any = [];
  resultArray:any;
  showModal: boolean;
  id:number;
  name:any;
  passport:any;
  address:any;
  dob:any;
   displayedNewdata=false;
   filterValues = {};
   dataSource = new MatTableDataSource();
  data:number ;
  displayedColumns: string[] = ['id','cname','checkin','passport','address','dob','seatno','updatePassenger'];
  filterSelectObj = [];
  constructor(private http: HttpClient,private _interactionService:InteractionService,private formBuilder: FormBuilder,) {
  this.filterSelectObj = [
    {
      name: 'Address',
      columnProp: 'address',
      options: []
    }, {
      name: 'Passport',
      columnProp: 'passport',
      options: []
    }, {
      name: 'DOB',
      columnProp: 'dob',
      options: []
    }
  ]


  
  }
  ngOnInit() {
    this._interactionService.flightmessage$.subscribe(message=>{
      if(message!=null)
      {
       this.id=message;
        this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.id).subscribe(x=>{this.newdata=x;
        this.resultArray=this.newdata;
        console.log(this.newdata)
        this.dataSource.data = this.resultArray;
        this.dataSource.filterPredicate=this.createFilter();
        this.filterSelectObj.filter((o) => {
          o.options = this.getFilterObject(this.resultArray, o.columnProp);
        });
      });
      
    }
  })
  
  
  }
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  filterChange(filter, event) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      // console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }


  updatePassenger(event,val){


    this.profileForm = this.formBuilder.group({  
      cname: new FormControl('',Validators.required),
      passport:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      dob:new FormControl('',Validators.required),
    })
  
    this.showModal = true;
    this.updatePassengerDisable=true;
    this.pid=val.id;
    console.log(this.pid);

    this.http.get<string[]>('http://localhost:3000/passengers?id='+this.pid).subscribe(x=>{this.passengerData=x;
    this.passengerValue=this.passengerData[0];
this.name=this.passengerValue.cname;
this.passport=this.passengerValue.passport;
this.address=this.passengerValue.address;
this.dob=this.passengerValue.dob;



  })

  }

  onSubmit() {

    this.submitted = true;

    if(this.profileForm.value['cname']=="")
    {
      this.profileForm.get('cname').setValue(this.name)
    }
    if(this.profileForm.value['passport']=="")
    {
      this.profileForm.get('passport').setValue(this.passport)
    }
    if(this.profileForm.value['address']=="")
    {
      this.profileForm.get('address').setValue(this.address)
    }
    if(this.profileForm.value['dob']=="")
    {
      this.profileForm.get('dob').setValue(this.dob)
    }
  

  
    this._interactionService.updatePassenger(this.profileForm.value,this.pid).subscribe(data => {

      console.log(this.profileForm.value)
      alert("Passenger Updated Successfully")  
          this.profileForm.reset();
         
          this.showModal = false;
        
       
    });
  }
    

  hide()
  {
    this.profileForm.reset();
    this.showModal = false;
  }

}
