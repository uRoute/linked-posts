import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { IUser } from '../../core/interfaces/user/iuser';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe, DatePipe , RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private readonly _UsersService = inject(UsersService)
  userData!:IUser;
  imgSrc!:File
  ngOnInit(){
    this._UsersService.GetLoggedUserData().subscribe({
      next:(res)=>{
        console.log(res.user);
        this.userData = res.user
      }
    })
  }

  ChangeImg(e:Event){
    console.log(e);
    let hamo = e.target as HTMLInputElement
    console.log(hamo.files);
    if(hamo.files && hamo.files.length>0){
      this.imgSrc = hamo.files[0];
      let formData = new FormData();
      formData.append('photo' , this.imgSrc)
      this._UsersService.UploadProfileImage(formData).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message == 'success'){
            this._UsersService.GetLoggedUserData().subscribe({
              next:(res)=>{
                console.log(res.user);
                this.userData = res.user
              }
            })
          }
        }
      })
    }
  }


}
