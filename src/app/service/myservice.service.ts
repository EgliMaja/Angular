import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { BehaviorSubject, Observable, tap , of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface users{
  email:string;
  name:string;
  password:string;
  age:number;
}

@Injectable({
  providedIn: 'root'
})
export class MyserviceService implements PreloadingStrategy{

  private api: string;
  private client:BehaviorSubject<users[]>
  client$:Observable<users[]>

  currentrole='admin'
  
  constructor(private http:HttpClient) {
    this.api=environment.api+'/posts/';
    this.client=new BehaviorSubject<users[]>([]);
    this.client$=this.client.asObservable()
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
   if(route.data && route.data['preload']){
    return load()
   }
   else{
    return  of(null)
   }
  }
  getRegisterList():Observable<users[]>{
    return this.http.get<users[]>(this.api)
    .pipe(
      tap(cli=>this.client.next(cli))
    )
  }

  addRegister(client: Omit<users,'id'>):Observable<users[]>{
    return this.http.post<users[]>(this.api,client)
  }
}
