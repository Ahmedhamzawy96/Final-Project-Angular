import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Interface/login-user';
 import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerations',
  templateUrl: './registerations.component.html',
  styleUrls: ['./registerations.component.css']
})
export class RegisterationsComponent implements OnInit {

  RegisterForm: any = FormGroup;
  submitted = false;
  constructor(
     private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.RegisterForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    this.submitted = true;
    if (this.RegisterForm.valid) {
    
    }
  }

}
