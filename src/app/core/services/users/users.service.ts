import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environment/environement';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:object) { }
  userDecodedToken:any;
  loginSignal:WritableSignal<boolean> = signal(false)
  DecodeToken(token:string){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.userDecodedToken = jwtDecode(token);
      this.loginSignal.update(()=>true)
    }
  }
  SignUp(formGroup:object):Observable<any>{
    return this._HttpClient.post(`${environement.baseUrl}/users/signup` , formGroup )
  }
  SignIn(formGroup:object):Observable<any>{
    return this._HttpClient.post(`${environement.baseUrl}/users/signin` , formGroup )
  }
  ChangePassword(formGroup:object):Observable<any>{
    return this._HttpClient.patch(`${environement.baseUrl}/users/change-password` , formGroup )
  }
  UploadProfileImage(formData:object):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/users/upload-photo` , formData)
  }
  GetLoggedUserData():Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/users/profile-data`)
  }
}
