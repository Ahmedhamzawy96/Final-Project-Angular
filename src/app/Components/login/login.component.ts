import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Interface/login-user';
import { LoginService } from 'src/app/Services/Login/login.service';
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
    private loginServ: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.LoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.valid) {
      this.loginServ
        .Login(<LoginUser>this.LoginForm.value)
        .subscribe((Data) => {
          debugger;
          if (Data == 0) {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'البيانات غير صحيحة حاول مرة اخرى!',
            });
            this.LoginForm.reset();
          }else{
            localStorage.setItem('Token', JSON.stringify(Data.token)),
            localStorage.setItem('UserName', JSON.stringify(Data.userName)),
            localStorage.setItem('Type', JSON.stringify(Data.type));
            this.router.navigate(['/Home']).then(() => {
            window.location.reload();
        });
          }
        });
    }
  }
  ngOnInit() {}
}
