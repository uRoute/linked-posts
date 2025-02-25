import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  private readonly _UsersService = inject(UsersService)
  private readonly _Router = inject(Router)
  clearTimeOut:any
  changePasswordForm:FormGroup= new FormGroup({
    password: new FormControl(null , Validators.required),
    newPassword: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{2,}[@#$%^&*!]{1,8}[0-9]{2,}$/)]),
  })

  change(){
    if(this.changePasswordForm.valid){
      this._UsersService.ChangePassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message=='success'){
            localStorage.removeItem('token');
            this._UsersService.loginSignal.update( ()=> false )
            this._UsersService.userDecodedToken = {};
            this.clearTimeOut = setTimeout( ()=>{
              this._Router.navigate(['/login'])
            },1500);
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  ngOnDestory(){
    clearTimeout(this.clearTimeOut)
  }

}
