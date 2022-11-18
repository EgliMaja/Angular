import { Component, OnInit } from '@angular/core';
import { AdminService, flysystem } from '../service/admin.service';
import { FindTicketService, flyreservation } from '../service/find-ticket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay, Observable, startWith, switchMap, of, tap, map, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  availableFlights:flysystem[]=[]
  public fly:flysystem= {} as flysystem;
  dataid: FormGroup |any
  public FindAirportTo = new FormControl('')



  constructor(private resultFlight:AdminService , private route : Router ,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.show_userFlights()
    
  }

  show_userFlights(){
    this.resultFlight.displayFlights().subscribe(
      show=> this.availableFlights=show
      )
    }


      }
