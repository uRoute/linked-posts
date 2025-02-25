import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:LoginComponent , title:'Login'},
    {path:'register' , loadComponent: ()=> import('./pages/register/register.component').then((c)=>c.RegisterComponent) , title:'Register'},
    {path:'timeline' ,canActivate:[authGuard] , loadComponent: ()=> import('./pages/timeline/timeline/timeline.component').then((c)=>c.TimelineComponent) , title:'Linked posts'},
    {path:'profile' ,canActivate:[authGuard] , loadComponent: ()=> import('./pages/profile/profile.component').then((c)=>c.ProfileComponent) , title:'Profile'},
    {path:'post-details' ,canActivate:[authGuard] , loadComponent: ()=> import('./pages/post-details/post-details.component').then((c)=>c.PostDetailsComponent) , title:'Linked posts'},
    {path:'change-password' ,canActivate:[authGuard] , loadComponent: ()=> import('./pages/change-password/change-password.component').then((c)=>c.ChangePasswordComponent) , title:'Linked posts'},
    {path :'**' , loadComponent: ()=> import('./shared/components/notFound/notfound/notfound.component').then( (components)=> components.NotfoundComponent ) , title:'Error 404'},
];
