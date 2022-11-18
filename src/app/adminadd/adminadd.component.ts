import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AdminService, flysystem } from '../service/admin.service';

interface FlyTo{
  value:string;
  viewValue:string;
}

interface FlyFrom{
  value:string;
  viewValue:string;
}

@Component({
  selector: 'app-adminadd',
  templateUrl: './adminadd.component.html',
  styleUrls: ['./adminadd.component.css']
})

export class AdminaddComponent implements OnInit {

public fly:flysystem = {} as flysystem;
ADD:FormGroup;

@Input()
FromDate= new Date().toISOString().split('T')[0];
DepartDate = this.FromDate


flyTo:FlyTo[]=[
    {value:'International Airport Tirana', viewValue:'International Airport Tirana'},
    {value:'Turin Italy', viewValue:'Turin Italy'},
    {value:'Heathrow London', viewValue:'Heathrow London'},
    {value:'Amsterdam Netherlands', viewValue:'Amsterdam Netherlands'},
    {value:'Milano Italy', viewValue:'Milano Italy'},
    {value:'Roma Italy', viewValue:'Roma Italy'},
    {value:'Buenos Aires Argentina', viewValue:'Buenos Aires Argentina'},
    {value:'Istanbul Turkey', viewValue:'Istanbul Turkey'},
    {value:'New York USA', viewValue:'New York USA'},
    {value:'Madrid Spain', viewValue:'Buenos Aires Argentina'},
    {value:'Paris France', viewValue:'Paris France'},
    {value:'Brusseless Belgium', viewValue:'Brusseless Belgium'},
    {value:'Hanover Germany', viewValue:'Hanover Germany'},
    {value:'Berlin Germany', viewValue:'Berlin Germany'},
    {value:'Ankara Turkey', viewValue:'Ankara Turkey'},
    {value:'Barcelona Spain', viewValue:'Barcelona Spain'},
    {value:'Munich Germany', viewValue:'Munich Germany'},
    {value:'Frankfurt Germany', viewValue:'Frankfurt Germany'},
    {value:'Treviso Italy', viewValue:'Treviso Italy'},
    {value:'Naples Italy', viewValue:'Naples Italy'},
    {value:'Orleans France', viewValue:'Orleans France'},
    {value:'Marsielle France', viewValue:'Marsielle France'},
    {value:'Pisa Italy', viewValue:'Pisa Italy'},
]
flyFrom:FlyFrom[]=[
  {value:'International Airport Tirana', viewValue:'International Airport Tirana'},
    {value:'Turin Italy', viewValue:'Turin Italy'},
    {value:'Heathrow London', viewValue:'Heathrow London'},
    {value:'Amsterdam Netherlands', viewValue:'Amsterdam Netherlands'},
    {value:'Milano Italy', viewValue:'Milano Italy'},
    {value:'Roma Italy', viewValue:'Roma Italy'},
    {value:'Buenos Aires Argentina', viewValue:'Buenos Aires Argentina'},
    {value:'Istanbul Turkey', viewValue:'Istanbul Turkey'},
    {value:'New York USA', viewValue:'New York USA'},
    {value:'Madrid Spain', viewValue:'Buenos Aires Argentina'},
    {value:'Paris France', viewValue:'Paris France'},
    {value:'Brusseless Belgium', viewValue:'Brusseless Belgium'},
    {value:'Hanover Germany', viewValue:'Hanover Germany'},
    {value:'Berlin Germany', viewValue:'Berlin Germany'},
    {value:'Ankara Turkey', viewValue:'Ankara Turkey'},
    {value:'Barcelona Spain', viewValue:'Barcelona Spain'},
    {value:'Munich Germany', viewValue:'Munich Germany'},
    {value:'Frankfurt Germany', viewValue:'Frankfurt Germany'},
    {value:'Treviso Italy', viewValue:'Treviso Italy'},
    {value:'Naples Italy', viewValue:'Naples Italy'},
    {value:'Orleans France', viewValue:'Orleans France'},
    {value:'Marsielle France', viewValue:'Marsielle France'},
    {value:'Pisa Italy', viewValue:'Pisa Italy'},
]
  constructor(private service:AdminService, private route:Router) {
    this.ADD=new FormGroup({
      FlyFrom: new FormControl('',[Validators.required]),
      FlyTo: new FormControl('',[Validators.required]),
      aircraftID: new FormControl('',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]),
      aircraftName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
      depart: new FormControl('',[Validators.required]),
      return: new FormControl('',[Validators.required]),
      start: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required,Validators.min(35),Validators.max(550)])
    })
   }

  ngOnInit(): void {
  this.ADD.valueChanges.pipe(
    tap()
  ).subscribe()
  }

  add(){
    this.service.addFlights(this.fly).subscribe(
      (data:flysystem)=>{
        alert('Data added Sucessfully!')
        this.route.navigate(['/adminview'])
      },
      err=>{
        alert('Data added Sucessfully!')
        this.route.navigate(['/'])
      }
    )
  }



}
