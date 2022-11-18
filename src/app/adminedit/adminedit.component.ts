import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.css']
})
export class AdmineditComponent implements OnInit {

  public fly:flysystem= {} as flysystem;
  dataid:FormGroup | any;
  public datas:flysystem[]=[]

  @Input()
  FromDate= new Date();
  DepartDate = new Date();


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

  constructor(private service:AdminService , private route:Router, private activeRoute:ActivatedRoute) {


  }

  ngOnInit(): void {

    this.dataid = new FormGroup({
      'FlyFrom': new FormControl('',Validators.required),
      'FlyTo': new FormControl('',Validators.required),
      'aircraftID': new FormControl('',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]),
      'aircraftName': new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      'depart': new FormControl('',Validators.required),
      'return': new FormControl('',Validators.required),
      'start': new FormControl('',Validators.required),
      'price': new FormControl('',[Validators.required,Validators.min(35),Validators.max(550)])
    })

    let flightList: flysystem[]
    this.service.displayFlights().subscribe(list =>
      {
        flightList = list
        for(let flight of flightList){
          if(flight.id === +this.activeRoute.snapshot.params['dataid']){
            this.dataid.get('FlyFrom').setValue(flight.flyFrom),
             this.dataid.get('FlyTo').setValue(flight.flyTo),
              this.dataid.get('aircraftID').setValue(flight.aircraftID),
               this.dataid.get('aircraftName').setValue(flight.aircraftName),
               this.dataid.get('depart').setValue(flight.depart),
               this.dataid.get('return').setValue(flight.return),
               this.dataid.get('start').setValue(flight.start),
               this.dataid.get('price').setValue(flight.price)
          }
        }
      })
  }

  update(){
    let flightList: flysystem[]
    let flight: flysystem = {
      flyFrom: this.dataid.get('FlyFrom').value,
      flyTo: this.dataid.get('FlyTo').value,
      aircraftID: this.dataid.get('aircraftID').value,
      aircraftName: this.dataid.get('aircraftName').value,
      depart: this.dataid.get('depart').value,
      return:this.dataid.get('return').value,
      start: this.dataid.get('start').value,
      price: this.dataid.get('price').value,
      id: +this.activeRoute.snapshot.params['dataid']
    }
  this.service.updateFlights(flight).subscribe()
  alert('Data Updated SucessFully')
  this.route.navigate(['adminview'])
  }
}
