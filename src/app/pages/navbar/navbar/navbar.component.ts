import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { isPlatformBrowser } from '@angular/common';
import { IUser } from '../../../core/interfaces/user/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  private readonly _UsersService = inject(UsersService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  userData!:IUser
  
  loginCheck:Signal<boolean> = computed( ()=> this._UsersService.loginSignal() )
  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(localStorage.getItem('token')){
        this._UsersService.loginSignal.update(()=>true)
        this._UsersService.GetLoggedUserData().subscribe({
          next:(res)=>{
            this.userData = res.user
          }
        })
      }
    }
  }
  LogOut(){
    this._UsersService.loginSignal.update( ()=> false )
    this._UsersService.userDecodedToken = {};
    localStorage.removeItem('token');
    this._Router.navigate(['/login'])
  }

}
