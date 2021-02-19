import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // get token from local storage
    let token=localStorage.getItem("token");
    // if token existed
    if(token){
      // add token to header of request object
      let transformedReqObj=req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      // forward req object to backend
       return next.handle(transformedReqObj)

    }
    else{
      // forward req object as it is to backend
      return next.handle(req)
    }
  }
}
