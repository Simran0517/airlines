import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { InteractionService } from '../../../interaction.service';
import { ChangeDetectionStrategy} from '@angular/core';
@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  submitted=false;
updatePassengerDisable=false;
public pid:number;
profileForm: FormGroup;
passengerData:any;
passengerValue:any;
  newdata:any = [];
  newseat:any=[];
  resultArray:any;
  showModal: boolean;
  id:number;
  seatArray:any=[];
  newArray:any=[];
  missing:any=[];
  seatnumber:any;
  newPassengers:any=[];
   displayedNewdata=false;
   filterValues = {};
   dataSource = new MatTableDataSource();
  data:number ;
  displayedColumns: string[] = ['id','cname','seatno','checkin','ancillary','special','change seat'];
  filterSelectObj = [];
  constructor(private http: HttpClient,private _interactionService:InteractionService,private formBuilder: FormBuilder,) {
  this.filterSelectObj = [
    {
      name: 'CheckIn Status',
      columnProp: 'checkin',
      options: []
    }, {
      name: 'Special Category',
      columnProp: 'otherCategory',
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

  changeSeat(event,val){



    this.profileForm = this.formBuilder.group({  
      seatno: new FormControl('',Validators.required),
    })
  
    this.showModal = true;
    this.updatePassengerDisable=true;
    this.pid=val.id;
    console.log(this.pid);

    this.http.get<string[]>('http://localhost:3000/flights?id='+this.id).subscribe(x=>{this.newseat=x;
        
      this.seatArray=this.newseat[0].seats;
      console.log(this.seatArray);




      this.http.get<string[]>('http://localhost:3000/passengers?flightId='+this.id).subscribe(x=>{this.newPassengers=x;

      
      this.newPassengers.forEach((el) => {
      let seatArrayNew:any=[];
      {
        seatArrayNew.push(el.seatno);
      }  
      this.newArray.push(seatArrayNew);
     
      })

      function comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            return other == current
          }).length == 0;
        }
      }
      
     this.missing = this.seatArray.filter(comparer(this.newArray));
    });
  });
  }




  onSubmit() {

    this.submitted = true;
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
