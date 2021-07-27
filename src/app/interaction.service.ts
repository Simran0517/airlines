import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { HttpClient} from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import {Observable} from 'rxjs';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
private flightmessageSource=new Subject<number>();
flightmessage$=this.flightmessageSource.asObservable();
private flightmessageSourcePassenger=new Subject<number>();
flightmessagepassenger$=this.flightmessageSourcePassenger.asObservable();
constructor(private httpClient: HttpClient) { }

  sendFlightId(message:number){
    this.flightmessageSource.next(message);
  }
  sendFlightIdForPassenger(message:number){
    this.flightmessageSourcePassenger.next(message);
  }

  create(passenger): Observable<any> {
    return this.httpClient.post('http://localhost:3000/passengers/', JSON.stringify(passenger),this.httpOptions);

  } 


  updatePassenger(passenger,x) {
    return this.httpClient.patch(this.apiServer+'/passengers/'+x, passenger,this.httpOptions);

  } 

  addService(ancillary,x){
    return this.httpClient.put('http://localhost:3000/flights/'+x,  JSON.stringify(ancillary),this.httpOptions);
  }
  addPassengerAncillary(ancillary,x){
    return this.httpClient.put('http://localhost:3000/passengers/'+x,  JSON.stringify(ancillary),this.httpOptions);
  }

  changeStatus(status,x){
return this.httpClient.patch(this.apiServer+'/passengers/'+x, status,this.httpOptions);


  }


  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        'required': 'Required',
        
        
    };
    return config[validatorName];
}
}
