import { Component,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { MyserviceService } from '../service/myservice.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  checkUserLogin:boolean=false;

  constructor(private matdialog:MatDialog,private route:Router) { }

  ngOnInit(): void {

  }

  OpenPopup(){
    this.matdialog.open(SigninComponent,{enterAnimationDuration:'500ms',
    exitAnimationDuration:'500ms'})
    this.checkUserLogin == true
  }

  admin(){
    this.route.navigate(['adminview'])
  }

}
