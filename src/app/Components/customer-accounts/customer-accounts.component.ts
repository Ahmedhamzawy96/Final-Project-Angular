import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { transition } from '@angular/animations';
import { VirtualTimeScheduler } from 'rxjs';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';
import { AccountType } from 'src/app/Interface/Enums/account-type';

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
  constructor(
    private csutServ: CustService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder
  ) {
    this.customeraccountsform = fb.group({
      accountID: [this.customerID],
      accountType: [AccountType.Customer],
      amount: [''],
      type: [''],
      operationID: [1],
      operation: [''],
      date: [this.BillDate],
      userName: ['ahmed123'],
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
    this.customeraccountsform.controls['type'].setValue(TransType.Paid);
    this.customeraccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    if (this.customeraccountsform.valid) {
      this.transactionsService
        .addtransaction(this.customeraccountsform.value)
        .subscribe(() => {
          this.selectedcustomer(this.customerID);
          this.selcustomer.account =
            <number>this.selcustomer.account -
            this.customeraccountsform.controls['amount'].value;
          this.csutServ
            .updateCustomer(this.customerID, this.selcustomer)
            .subscribe((Data) => {
              this.Custaccount = <number>Data.account;
            });
        });
    }
  }

  Get() {
    this.customeraccountsform.controls['type'].setValue(TransType.Get);
    this.customeraccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    console.log(this.customeraccountsform.value);
    if (this.customeraccountsform.valid) {
      this.transactionsService
        .addtransaction(this.customeraccountsform.value)
        .subscribe(() => {
          this.selectedcustomer(this.customerID);
          this.selcustomer.account =
            <number>this.selcustomer.account +
            this.customeraccountsform.controls['amount'].value;
          this.csutServ
            .updateCustomer(this.customerID, this.selcustomer)
            .subscribe((Data) => {
              this.Custaccount = <number>Data.account;
            });
        });
    }
  }
}
