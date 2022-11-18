import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {of} from 'rxjs'
export interface flysystem{
  flyTo:string;
  flyFrom:string;
  aircraftID:number;
  aircraftName:string;
  depart:Date;
  return:Date;
  start:Date;
  price:number;
  id?: number
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiadmin:string;
  private fly:BehaviorSubject<flysystem[]> = new BehaviorSubject<flysystem[]>([]);
  fly$:Observable<flysystem[]> = this.fly.asObservable()

  constructor(private http:HttpClient) {
    this.apiadmin= environment.api+'/admin/'
  }


  addFlights(flyghts: Omit <flysystem,'id'>):Observable<flysystem>{
    const flyght:flysystem[]=this.fly.getValue()
    return this.http.post<flysystem>(this.apiadmin,flyghts)
  }

  //display data
  displayFlights():Observable<flysystem[]>{
    return this.http.get<flysystem[]>(this.apiadmin)
    .pipe(
      tap(flight=>this.fly.next(flight))
      )
  }

  //display on ticket at get component
  displayTicketData(booking:flysystem[]):Observable<flysystem[]>{
    return this.http.get<flysystem[]>((this.apiadmin)+booking)
  }

  delete(deleteFlight :Omit <flysystem, 'id'>){
    throw new Error('Method not implemented')
  }

  //delete data at adminview component
  deleteFlight(flight:flysystem):Observable<flysystem[]>{
    return this.http.delete<flysystem[]>((this.apiadmin)+flight.id)
  }

  //fetch data at adminedit component
  fetchDataFlight(id:flysystem[]):Observable<flysystem[]>{
    return this.http.get<flysystem[]>((this.apiadmin)+id)
  }

  //update at adminedit component
  updateFlights(flight: flysystem):Observable<flysystem>{
    return this.http.put<flysystem>((this.apiadmin)+flight.id, flight)
}
}
