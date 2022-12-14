import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';
import { AccountType } from 'src/app/Interface/Enums/account-type';
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
  custname: string;
  transactions: ITransactions[];
  customertrans: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();
  customer: ICustomer;
  transact: boolean = false;
  constructor(
    private csutServ: CustService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder
  ) {
    this.customeraccountsform = fb.group({
      accountID: [this.customerID, [Validators.required]],
      accountType: [AccountType.Customer],
      paid: [
        '',
        [Validators.required, Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/)],
      ],
      remaining: ['0'],
      type: [''],
      operationID: [1],
      operation: [''],
      date: [this.BillDate],
      userName: [JSON.parse(localStorage.getItem('UserName'))],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }
  selectedcustomer(id: Number) {
    this.selcustomer = this.customers.find((c) => c.id == id);
    this.Custaccount = <number>this.selcustomer.account;
    this.transactionsService
      .transactionbytype(<number>this.selcustomer.id, AccountType.Customer)
      .subscribe((data) => {
        this.transactions = data;
        this.transactions.forEach((element) => {
          element.Name = this.selcustomer.name;
        });
      });
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
        text: '?????? ???? ???????? ???????? ???????????? ?????????????? ?????? ???? ???? ?????????? ???????? ???????????? ?????????????? ',
      });
    } else {
      if (this.customeraccountsform.valid) {
        this.transactionsService
          .addtransaction(this.customeraccountsform.value)
          .subscribe(() => {
            this.selectedcustomer(this.customerID);
            this.selcustomer.account =
              Number(this.selcustomer.account) +
              Number(this.customeraccountsform.controls['paid'].value);
            this.csutServ
              .updateCustomer(this.customerID, this.selcustomer)
              .subscribe(() => {
                this.Custaccount = 0;
              });
            this.customeraccountsform.controls['paid'].reset();
            this.customeraccountsform.controls['notes'].reset();
            this.transact = false;
            Swal.fire({
              icon: 'success',
              title: '',
              text: '???? ??????????  ??????????',
            });
          });
      }
    }
  }

  Get() {
    this.transact = true;
    this.customeraccountsform.controls['type'].setValue(TransType.Get);
    this.customeraccountsform.controls['operation'].setValue(
      Operation.CustomerTrans
    );
    if (this.customeraccountsform.controls['paid'].value > this.Custaccount) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: '?????? ???? ???????? ???????? ???????????? ???????????? ?????? ???? ???? ?????????? ???????? ???????????? ?????????????? ',
      });
    } else {
      if (this.customeraccountsform.valid) {
        console.log(this.customeraccountsform.value);
        this.transactionsService
          .addtransaction(this.customeraccountsform.value)
          .subscribe(() => {
            this.selectedcustomer(this.customerID);
            this.selcustomer.account =
              Number(this.selcustomer.account) -
              Number(this.customeraccountsform.controls['paid'].value);
            this.csutServ
              .updateCustomer(this.customerID, this.selcustomer)
              .subscribe((Data) => {
                this.Custaccount = <number>Data.account;
              });
            this.customeraccountsform.controls['paid'].reset();
            this.customeraccountsform.controls['notes'].reset();
            this.transact = false;
            Swal.fire({
              icon: 'success',
              title: '',
              text: '???? ?????????????? ??????????',
            });
            this.csutServ.getCustomers().subscribe((data) => {
              this.customers = data;
            });
          });
      }
    }
  }
}
