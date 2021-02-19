import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { uptime } from 'os';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './route.guard';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent },
  {path:"register",component:RegisterComponent},
  {path:"contactus",component:ContactusComponent },
  {path:"userdashboard",component:UserdashboardComponent,children:[
     {path:"userprofile",component:UserprofileComponent,canActivate:[RouteGuard]},
    {path:"updateprofile",component:UpdateprofileComponent}]},
    {path:"",redirectTo:"/home",pathMatch:"full"}                ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
