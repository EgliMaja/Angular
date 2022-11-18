import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AdminService, flysystem } from 'src/app/service/admin.service';
import {jsPDF} from 'jspdf'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  @ViewChild('content' , {static:false}) el!:ElementRef;
  public fly:flysystem = {} as flysystem;
  dataid:FormGroup | any;
  availableFlights:flysystem[]=[]


  constructor(private service:AdminService, private activeRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getMYTicket()

  }


  getMYTicket(){
    this.activeRoute.snapshot.params['dataid']
    this.service.displayTicketData(this.dataid as flysystem[]).subscribe(
      show => this.availableFlights = show
    )
  }

  print(){
    let pdf = new jsPDF('p','pt','a2')
    pdf.html(this.el.nativeElement,{
      callback: (pdf) =>{pdf.save('Air_Ticket.pdf')}
    })
  }

}
