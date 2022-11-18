import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminaddComponent } from '../adminadd/adminadd.component';
import { AdminService, flysystem } from '../service/admin.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {

  public fly:flysystem = {} as flysystem;
  addedFlights:flysystem[]=[];

  constructor(private service:AdminService, private popup:MatDialog) {}

  ngOnInit(): void {
    this.getMy_Add_Flights()
  }

  getMy_Add_Flights(){
    this.service.displayFlights().subscribe(
      show=>this.addedFlights=show
    )
  }

  deleteFlight(flyght:flysystem){
    if(confirm('Are You Sure To Delete ?')){
      this.service.deleteFlight(flyght).subscribe(
        ()=>{this.getMy_Add_Flights()}
      )}
  }

  OpenPopup(){
    this.popup.open(AdminaddComponent,{enterAnimationDuration:'500ms',
    exitAnimationDuration:'500ms'
  })
}

}
