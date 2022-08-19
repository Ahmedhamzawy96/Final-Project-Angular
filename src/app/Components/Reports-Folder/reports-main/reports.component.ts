import { ReportService } from './../../../Services/Reports/report.service';
import { CustomerAccountsComponent } from './../../customer-accounts/customer-accounts.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jsPDF } from "jspdf" ;
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  
  customers: ICustomer[];
  selcustomer: ICustomer;
  Custaccount:number;
  customerID:number;
  transactions: ITransactions[];
  Date:string=new Date().toLocaleString();
  
 CustminDate = new Date();
 CustmaxDate = new Date();
 CustRangeValue: Date[];
  constructor(  private csutServ: CustService ,private router:Router,private repserv:ReportService)
   {
    this.CustmaxDate.setDate(this.CustmaxDate.getDate() + 7);
    this.CustRangeValue = [this.CustminDate, this.CustmaxDate];
    }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });} 


  CustomerAccount(){
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RCAccounts',this.customerID]);
  }
  CustomerReceipts()
  {
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['ImportRecieptPrint',this.customerID]);
  }
}
