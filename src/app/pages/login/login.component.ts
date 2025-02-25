import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  clearTimeOut:any;
  flag:boolean = false;
  resMessage!:string
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })

  // Method to register new submit : fires when (ngSubmit)
  LoginUser(){
    if(this.loginForm.valid){
      this.flag = true
      this._UsersService.SignIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.resMessage = res.message
          if(res.message === 'success'){
            localStorage.setItem('token' , res.token);
            this._UsersService.DecodeToken(localStorage.getItem('token')!)
            this.clearTimeOut = setTimeout( ()=>{
              this._Router.navigate(['/timeline'])
            },1500);
          }
        },
        error:(err)=>{
          console.log(err.error.error);
          this.resMessage = err.error.error
        }
      })
    }else{
      this.flag = false
      console.log(this.loginForm);
      this.loginForm.markAllAsTouched()
    }
  } 

  ngOnDestroy(): void {
    clearTimeout(this.clearTimeOut)
  }


}
