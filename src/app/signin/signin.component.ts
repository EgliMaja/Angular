import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../register/register.component';
import { MyserviceService, users } from '../service/myservice.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private login:BehaviorSubject<users[]>
  login$:Observable<users[]>
  keepLogin:FormGroup;
  public client:users={} as users;
  private api:string;

  constructor(private matdialog:MatDialog , private service:MyserviceService,private route:Router , private http:HttpClient) {
    this.login= new BehaviorSubject<users[]>([])
    this.login$=this.login.asObservable()
    this.api=environment.api+'/posts/'
    this.keepLogin= new FormGroup({
     email:new FormControl(''),
     password: new FormControl('',)
    })
  }
  ngOnInit(): void {
    this.keepLogin.valueChanges.pipe(tap()).subscribe()
  }

  getRegistPerson(){
    this.service.getRegisterList().subscribe(this.login)
  }
  OpenPopup(){
    this.matdialog.open(RegisterComponent,{enterAnimationDuration:'500ms',
    exitAnimationDuration:'500ms'
  })
  }

  signin(keepLogin:FormGroup){
    this.http.get<users[]>(this.api)
    .subscribe(res=>{
      const user= res.find((u:users)=>{
        return u.email=== this.keepLogin.value.email && u.password === this.keepLogin.value.password
      })
      if(user){
        alert('You are succesfully login')
        this.keepLogin.reset();
        window.location.reload()
        this.route.navigate(['/'])
      }else{
        alert('User Not Found');
        this.route.navigate([this.OpenPopup()])
      }
      }
      )
  }



}
