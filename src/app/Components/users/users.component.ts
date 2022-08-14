import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { IUsers } from 'src/app/Interface/IUsers';
import { UsersService } from 'src/app/Services/Users/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  adduser:boolean=false;
  users :IUsers[];
  userstype:IUsers[];
  user :IUsers;
  seluser :IUsers;
  usertype : string ="";
  AddUser:FormGroup;
  TypeSelect :FormGroup;
  Username : string;
  constructor(private fb: FormBuilder, private userserv:UsersService ) {
    this.AddUser = fb.group({
      userName:[''],
      password:[''],
      type:['']
    })
    this.TypeSelect = fb.group({
      selectedtype:['']
    })


  }


  Adduser() {
    console.log(this.AddUser.value);
    this.userserv.addUsers(this.AddUser.value).subscribe((res) => {
      console.log(res);
      this.userserv.getUsers().subscribe((data: IUsers[]) => {
        this.users = data;
        console.log(this.users);
      });
    });
    // this.addCustomer.push(this.AddForm.value);
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
            this.users= this.users.filter((item) => item.userName !== usname);
            console.log(' deleted successfully!');
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
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف المستخدم ', 'error');
        }
      });
  }

  getusers() {
    this.userserv.getUsers().subscribe((data: IUsers[]) => {
      this.users = data;
      console.log(this.users);
    });
  }

  updateuser(username: string, password: string, type: string) {
    let upuser = this.users.find((upduser) => upduser.userName== username);
    upuser.userName = username;
    upuser.password = password;
    upuser.type= type;
    this.updateuser;
    this.userserv.userupdate(<string>upuser.userName, upuser).subscribe();
  }

  selecteduser(type:string){

    this.seluser = this.users.find(us => us.type == type);
    this.usertype=this.seluser.type;
     this.userserv.usertype(this.seluser.type).subscribe(data=>
      { 
          this.userstype = data;
/*         for(var i = 0; i < data.length; i++){  // loop through the object array
           // push each element to sys_id   
           this.userstype.push(data[i]);

               // this.TypeSelect.push(data[i]);
        
     } */
        console.log('done');
      })
  }



  ngOnInit(): void {
      this.getusers();
  }

}
