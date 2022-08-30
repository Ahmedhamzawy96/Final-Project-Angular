import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IUsers } from 'src/app/Interface/IUsers';
import { UsersService } from 'src/app/Services/Users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  senduser: IUsers;
  @ViewChild('userradioInputname') input: ElementRef<HTMLInputElement>;

  adduser: boolean = false;
  users: IUsers[];
  userstype: IUsers[];
  avaliabelcars: ICar[];
  user: IUsers;
  seluser: IUsers;
  usertype: number;
  AddUser: FormGroup;
  Username: string;
  added: boolean = false;
  tableNotValid: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userserv: UsersService,
    private carserv: CarService
  ) {
    this.AddUser = fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]{4,}'),
          Validators.minLength(4),
        ],
      ],
      type: ['', [Validators.required]],
      carID: [''],
    });
  }
  Adduser() {
    this.added = true;
    console.log(this.AddUser.value);
    console.log(this.AddUser.errors);
    if (this.AddUser.valid) {
      if (this.AddUser.controls['carID'].value == '') {
        this.senduser = {
          password: this.AddUser.controls['password'].value,
          userName: this.AddUser.controls['userName'].value,
          type: this.AddUser.controls['type'].value,
        };
        this.userserv.addUsers(this.senduser).subscribe((data) => {
          this.userserv.getUsers().subscribe((data: IUsers[]) => {
            this.users = data;
          });
          this.carserv.getavaliablecar().subscribe((Data) => {
            this.avaliabelcars = Data;
          });
          this.added = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم الاضافة بنجاح',
          });
        });
      } else {
        if (this.AddUser.controls['carID'].value)
          this.userserv.addUsers(this.AddUser.value).subscribe((res) => {
            this.userserv.getUsers().subscribe((data: IUsers[]) => {
              this.users = data;
              this.userserv.getUsers().subscribe((data: IUsers[]) => {
                this.users = data;
              });
              this.carserv.getavaliablecar().subscribe((Data) => {
                this.avaliabelcars = Data;
              });
              this.added = false;
              Swal.fire({
                icon: 'success',
                title: '',
                text: 'تم الاضافة بنجاح',
              });
            });
          });
      }
      this.getusers();
      this.AddUser.reset();
    }
  }

  deleteuser(usname: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'حذف المستخدم ',
        text: 'هل انت متاكد من حذفه هذا المستخدم',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',

        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(this.Username);
          this.userserv.deleteUsers(usname).subscribe((res) => {
            this.getusers();
          });
          this.users.pop();
          swalWithBootstrapButtons.fire(
            'تم الحذف',
            'تم حذف المستخدم ',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'الغاء',
            'لم يتم حذف المستخدم ',
            'error'
          );
        }
      });
  }

  getusers() {
    this.userserv.getUsers().subscribe((data: IUsers[]) => {
      this.users = data;
    });
    this.carserv.getavaliablecar().subscribe((Data) => {
      this.avaliabelcars = Data;
    });
  }

  updateuser(
    username: string,
    password: string,
    inpCheckbox: HTMLInputElement
  ) {
    let upuser = this.users.find((upduser) => upduser.userName == username);
    upuser.password = password;
    if (upuser.carID != null) {
      this.userserv.updateUsers(upuser.userName, upuser).subscribe();
    } else {
      this.userserv
        .updateUsers(upuser.userName, {
          userName: upuser.userName,
          password: upuser.password,
          type: upuser.type,
        })
        .subscribe();
    }
    Swal.fire('تم التعديل!', 'تم حفظ كلمة السر الجديدة', 'success');
    inpCheckbox.checked = false;
  }

  selectchange() {
    if (this.AddUser.controls['type'].value != 2) {
      this.AddUser.get('carID').patchValue('');
    }
  }

  ngOnInit(): void {
    this.getusers();
  }
}
