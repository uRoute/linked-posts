import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  flag:boolean = false;
  resMessage!:string;
  clearTime:any
  registerUser:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{2,}[@#$%^&*!]{1,8}[0-9]{2,}$/)]),
    rePassword: new FormControl(null),
    dateOfBirth: new FormControl(null , [Validators.required]),
    gender: new FormControl(null , [Validators.required]),
  } , {validators: this.ConfirmPassword})

  // Method to match password: fire by formGroup
  ConfirmPassword(fGroup:AbstractControl){
    return fGroup.get('password')?.value === fGroup.get('rePassword')?.value ? null : {'missMatch':true}
  }

  // Method to register new submit : fires when (ngSubmit)
  SubmitUser(){
    if(this.registerUser.valid){
      this.flag = true
      this._UsersService.SignUp(this.registerUser.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.resMessage = res.message
          this.clearTime = setTimeout( ()=>{
            this._Router.navigate(['/login'])
          },1500 )
        },
        error:(err)=>{
          console.log(err.error.error);
          this.resMessage = err.error.error
        }
      })
    }else{
      this.flag = false
      console.log(this.registerUser);
      this.registerUser.markAllAsTouched()
    }
  } 

  ngOnDestroy(){
    clearTimeout(this.clearTime)
  }

}
