import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MyserviceService, users } from '../service/myservice.service';


function MatchValidator(checkpassword: string): ValidatorFn {
  return (control): ValidationErrors| null => {
    if (control && control.value) {
      const form = control.parent;
      if (control.value !== form?.get(checkpassword)?.value) {
        return { notMatch: true };
      }

      return null;
    }

    return { notMatch: true };
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public client:users={} as users;
  private myClient:BehaviorSubject<users[]>
  myClient$:Observable<users[]>
  user:FormGroup;

  constructor(private service:MyserviceService,private router:Router) {
    this.myClient=new BehaviorSubject<users[]>([])
    this.myClient$=this.myClient.asObservable()
    this.user=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(6)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      age: new FormControl('',[Validators.required,Validators.min(15),Validators.pattern('[0-9]+')]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmpass: new FormControl('',MatchValidator('password'))
      })
   }

  ngOnInit(): void {
    this.user.valueChanges.pipe(tap()).subscribe()
    this.getUser()
  }


  getUser(){
    this.service.getRegisterList().subscribe(this.myClient)
  }

  addUser(){
    this.service.addRegister(this.client).subscribe((data:users[])=>{
      console.log(data)
      alert("Registered Sucessfully")
      this.router.navigate(['/signin'])
    },
    err=>{
      alert('Something Went Wrong!')
      this.router.navigate(['/register'])
    }
    )

    }

}
