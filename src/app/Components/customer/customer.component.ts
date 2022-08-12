import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { CustService } from 'src/app/Services/Customer/cust.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  Customers: ICustomer[];
 addCustomer: ICustomer[]=[];
  AddForm: FormGroup;
  customerID: number;

 

  constructor(private csutServ: CustService, private fb: FormBuilder) {
    this.AddForm = fb.group({
      name: [''],
      phone: [''],
      notes: [''],
    })
  }

  ngOnInit(): void {
    this.getcostomers();
 
  }




  //get one customer

  getcostomers() {

    this.csutServ.getCustomers().subscribe((data: ICustomer[]) => {
      this.Customers = data;
      console.log(this.Customers)

    })

  }
  //Add coustomer

  Addcustomer() {
    console.log(this.AddForm.value);
    this.csutServ.addCustomer(this.AddForm.value).subscribe((res) => {
      console.log(res);
      this.csutServ.getCustomers().subscribe((data: ICustomer[]) => {
        this.Customers = data;
        console.log(this.Customers)
  
      })
    })
   // this.addCustomer.push(this.AddForm.value);
  }




  deletecustomer(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'حذف  العميل ',
      text: 'هل انت متاكد من حذفه هذا العميل ',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'لا',
  
      confirmButtonText: 'نعم',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
  
        console.log(this.customerID);
        this.csutServ.deleteCustomer(id).subscribe(res => {
          this.Customers = this.Customers.filter(item => item.id !== id);
          console.log(' deleted successfully!');
        })
        this.Customers.pop();
     swalWithBootstrapButtons.fire(
        'تم الحذف',
        'تم حذف العميل ',
        'success'
      )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'الغاء',
          'لم يتم حذف العميل ',
          'error'
        )
      }
    }) 


  }

  updatecustomer(id:Number,name:string,phone:string,notes :string){

    let upcustomer = this.Customers.find(upcustomerr => upcustomerr.id == id);
     upcustomer.name = name;
      upcustomer.phone = phone;
      upcustomer.notes = notes; 
      this.updatecustomer


 }

}
