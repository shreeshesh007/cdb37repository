import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  file:File;
  
  incomingFile(event)
  {
    this.file=event.target.files[0]
  }

  formData=new FormData();
  
// inject user service

 constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      pincode:new FormControl(null,Validators.required),
     
      address:new FormControl(null,Validators.required),
      


    });
  }
onSubmit(){
  let userObj=this.registerForm.value;

this.formData.append("photo",this.file,this.file.name);
this.formData.append("userObj",JSON.stringify(userObj));





this.us.createUser(this.formData).subscribe(
  res=>{
    if(res["message"]=="user existed")
    {
    alert("username is already taken")
  }
      if(res["message"]=="user created"){
        alert("registration success")

        this.router.navigateByUrl("/login")
        
      }
  },
  err=>{
    alert("something went wrong in user creation")
    console.log(err)
  }
)
}
}