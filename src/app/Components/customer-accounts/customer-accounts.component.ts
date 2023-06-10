import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';
 import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent implements OnInit {
  customeraccountsform: FormGroup;
  customers: ICustomer[];
  selcustomer: ICustomer;
  customerID: number;
  Custaccount: number = 0;
   transactions: ITransactions[];
 customer: ICustomer;
  transact: boolean = false;
  constructor(
     private fb: FormBuilder
  ) {
    this.customeraccountsform = fb.group({
      accountID: [this.customerID, [Validators.required]],
       paid: [
        '',
        [Validators.required, Validators.pattern(/([0-9\u0660-\u0669])+$/)],
      ],
     
     
    });
  }

  ngOnInit(): void {
 
  }
  selectedcustomer(id: Number) {
    this.selcustomer = this.customers.find((c) => c.id == id);
    this.Custaccount = <number>this.selcustomer.account;
 
  }

  Paid() {
    this.transact = true;
    this.customeraccountsform.controls['type'].setValue(TransType.Paid);
    this.customeraccountsform.controls['operation'].setValue(
      Operation.CustomerTrans
    );
    if (this.customeraccountsform.controls['paid'].value > this.Custaccount) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون قيمة المبلغ المدفوع اقل من او يساوي قيمة المبلغ المتبقي ',
      });
    } else {
      if (this.customeraccountsform.valid) {
       
            this.customeraccountsform.controls['paid'].reset();
            this.customeraccountsform.controls['notes'].reset();
            this.transact = false;
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'تم الدفع  بنجاح',
            });
      
      }
    }
  }

  
}
