import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { transition } from '@angular/animations';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customers: ICustomer[];
  selcustomer: ICustomer;
  custname: string;
  transactions: ITransactions[];
  transaction: ITransactions;
  customertrans: ITransactions[] = [];
  BillDate: string = new Date().toUTCString();
  customeraccountsform: FormGroup;
  paymentprocess: FormGroup;
  customerID: number = 0;
  customer: ICustomer;
  constructor(private csutServ: CustService, private transactionsService: TransactionsService, private fb: FormBuilder) {
    this.customeraccountsform = fb.group({
      name: [''],
      total: [''],
      remaining: [''],
      date: [(this.BillDate)],

    })

    this.paymentprocess = fb.group({
      paid: [''],
      notes: ['']
    })
  }

  ngOnInit(): void {

    this.csutServ.getCustomers().subscribe(data => {
      this.customers = data;
    })
    this.transactionsService.gettransactions().subscribe(data => {
      this.transactions = data;
    })
  }

  Remainingamount() {
    this.customeraccountsform.controls['remaining'].setValue(this.customeraccountsform.controls['total'].value - this.paymentprocess.controls['paid'].value);
  }
  selectedcustomer(id: number) {

    this.selcustomer = this.customers.find(c => c.id == id);
    this.customerID = this.selcustomer.id;
    console.log(this.customerID);
  }
  customeraccount(id : number) {
      if(id == this.selcustomer.id){
        this.transactionsService.gettransactionsByID(id).subscribe(data=>
          { 
            this.transaction.amount;
            this.transaction.receiptID;
            this.transaction.receiptType;
            this.transaction.date;
           console.log(data);
          })
      }

  }

  //get from transaction interface(receiptID,date,receiptType) / from customer interface (id,name,notes)

}
