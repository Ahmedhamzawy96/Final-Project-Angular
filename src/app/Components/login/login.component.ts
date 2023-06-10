import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Interface/login-user';
 import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: any = FormGroup;
  submitted = false;
  constructor(
     private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.LoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    
  }
  ngOnInit() {}
}
