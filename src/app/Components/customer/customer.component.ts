import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { CustService } from 'src/app/Services/Customer/cust.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  Customers: ICustomer[];
  addCustomer: ICustomer[] = [];
  AddForm: FormGroup;
  customerID: number;
  added: boolean = false;
  tableNotValid: boolean = false;

  constructor(private csutServ: CustService, private fb: FormBuilder) {
    this.AddForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.pattern('[0-9]{11}'),
        ],
      ],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.getcostomers();
  }

  //get one customer

  getcostomers() {
    this.csutServ.getCustomers().subscribe((data: ICustomer[]) => {
      this.Customers = data;
    });
  }
  //Add coustomer

  Addcustomer() {
    this.added = true;
    if (this.AddForm.valid) {
      this.csutServ.addCustomer(this.AddForm.value).subscribe(() => {
        this.AddForm.reset();
        this.added = false;
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'تم الاضافة بنجاح',
        });
        this.csutServ.getCustomers().subscribe((data: ICustomer[]) => {
          this.Customers = data;
        });
      });
    }
  }

  deletecustomer(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'حذف  العميل ',
        text: 'هل انت متاكد من حذفه هذا العميل ',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',
        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.csutServ.deleteCustomer(id).subscribe(() => {
            this.Customers = this.Customers.filter((item) => item.id !== id);
            console.log(' deleted successfully!');
          });
          this.Customers.pop();
          swalWithBootstrapButtons.fire(
            'تم الحذف',
            'تم حذف العميل ',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف العميل ', 'error');
        }
      });
  }

  updatecustomer(
    id: Number,
    name: string,
    phone: string,
    notes: string,
    ref: HTMLInputElement
  ) {
    this.tableNotValid = true;
    let regex: RegExp = new RegExp('[0-9]{11}');
    if (name.length < 3) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب الا يقل الاسم عن 4 حروف',
      });
    } else if (!phone.match(regex)) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب يجب ان يتكون رقم الهاتف من 11 رقم ',
      });
    } else {
      let upcustomer = this.Customers.find(
        (upcustomerr) => upcustomerr.id == id
      );
      upcustomer.name = name;
      upcustomer.phone = phone;
      upcustomer.notes = notes;
      this.updatecustomer;
      this.csutServ
        .updateCustomer(<number>upcustomer.id, upcustomer)
        .subscribe();
      ref.checked = false;
      this.tableNotValid = true;
    }
  }
}
