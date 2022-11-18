import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface flyreservation{
  flyTo:string;
  depart:string;
  startDate:Date;
  endDate:Date;
}

@Injectable({
  providedIn: 'root'
})
export class FindTicketService {

  private apitwo: string;
  private reservation:BehaviorSubject<flyreservation[]>
  reservation$:Observable<flyreservation[]>

  constructor(private http : HttpClient) {
    this.apitwo=environment.api+'/flyform/';
    this.reservation= new BehaviorSubject<flyreservation[]>([]);
    this.reservation$= this.reservation.asObservable()
  }

  getFlyBooking():Observable<flyreservation[]>{
    return this.http.get<flyreservation[]>(this.apitwo)
    .pipe(
      tap(rerervation=>this.reservation.next(rerervation))
    )
  }
  addReservation(Booking:Omit<flyreservation[],'id'>):Observable<flyreservation[]>{
    return this.http.post<flyreservation[]>(this.apitwo,Booking)
  }
}
