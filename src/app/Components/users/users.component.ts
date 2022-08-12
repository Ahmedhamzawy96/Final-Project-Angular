import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { IUsers } from 'src/app/Interface/IUsers';
import { UsersService } from 'src/app/Services/Users/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  UserData:FormGroup;
  submitted = false;
  constructor(private fmBuilder: FormBuilder, private userserv:UsersService ) {
    this.UserData= fmBuilder.group({
      username:['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password:['',[Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', [Validators.required]],
      type:['',[Validators.required]],

     },);


  }

  get username() {
    return this.UserData.get('username');
  }
   get password() {
    return this.UserData.get('password');
  }

  // get confirmPassword() {
  //   return this.UserData.get('confirmPassword');
  // }
  onSubmit() {
    this.submitted = true;

     let userModel: IUsers=  <IUsers>this.UserData.value ;
    if (this.UserData.invalid) {
        return;}
    {
    this.userserv.addUsers(this.UserData.value).subscribe({next:(Iuser) => {}    })
    }
  }
  addUser(){
  }

  ngOnInit(): void {

    this.UserData=this.fmBuilder.group({

      username:['',Validators.required],
      password:['',Validators.required],
      type:['',Validators.required]


    })
  }

}
