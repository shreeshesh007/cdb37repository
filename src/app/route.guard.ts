import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate():boolean{
    
    // check token in local storage
    let token=localStorage.getItem("token")
    // if token not found
    if(token==undefined){
      alert("unauthorised access")
      return false
    }
    return true;
  }
  
}
