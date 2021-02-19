import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  createUser(formData:any):Observable<any>{
    return this.hc.post("/user/register",formData)
  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj)
  }

  getUser(username){
    return this.hc.get("/user/getuser/"+username)
  }
}
