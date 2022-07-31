import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  registerForm:any =FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder) { }
  // get f() { return this.registerForm.controls; }

     onSubmit() {

    this.submitted = true;
 
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    {

    alert('SUCCESS!!');
     
    }

  }
  ngOnInit() {

    this.registerForm =this.formBuilder.group ({
      'username': ['', Validators.required, 
         //  Validators.pattern("*[a-z])(?=.*[A-Z]).{8,16}$")]
       ],
       'password': ['', [Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,8}")]
     ]
 
     });
   }
 
  

}




