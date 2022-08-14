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
      userName: [
        '',
        Validators.required,
        //  Validators.pattern("[a-z])(?=.[A-Z]).{8,16}$")]
      ],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.valid) {
      this.loginServ.Login(<LoginUser>this.LoginForm.value).subscribe(
        (Data) => {
          localStorage.setItem('Token', JSON.stringify(Data.token)),
            localStorage.setItem('UserName', JSON.stringify(Data.userName)),
            localStorage.setItem('Type', JSON.stringify(Data.type));
          this.router.navigate(['/Home']);
        },
        (error) => {
          console.log(error);
          if (error == 'Error: 401') {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'البيانات غير صحيحة اعد المحاولة مرا اخرا !',
            });
          }
        }
      );
    }
  }
  ngOnInit() {}
}
