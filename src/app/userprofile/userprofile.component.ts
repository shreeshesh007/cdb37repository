import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userObj;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    let username=localStorage.getItem("username")
    this.userObj=this.us.getUser(username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
        this.userObj=res["user"]
      }
      
      else{
        alert(res["message"])
        this.router.navigateByUrl("/login")
      }
      },
      err=>{
        alert("somethimg went wrong")
        console.log(err)
      }
    )
  }
}
