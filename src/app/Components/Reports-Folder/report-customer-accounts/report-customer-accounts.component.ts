import { TransType } from './../../../Interface/Enums/TransType';
import { Operation } from './../../../Interface/Enums/operation';
import { CustService } from './../../../Services/Customer/cust.service';
import { ITransactions } from './../../../Interface/ITransactions';
import { TransactionsService } from './../../../Services/transactions.service';
import { Component, OnInit, Type } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { ReportService } from 'src/app/Services/Reports/report.service';

@Component({
  selector: 'app-report-customer-accounts',
  templateUrl: './report-customer-accounts.component.html',
  styleUrls: ['./report-customer-accounts.component.css']
})
export class ReportCustomerAccountsComponent implements OnInit {

  constructor(private transerve:TransactionsService,private rout : ActivatedRoute,private custserv:CustService,private repserv:ReportService) { }
  transactions:ITransactions[];
  customertrans: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();
  selcustomer: ICustomer;
  custid:string;
  transact: boolean = false;
  Date:string=new Date().toLocaleString();
  date:Date[]=this.repserv.getDates();
Total:number=0;

  ngOnInit(): void {
    this.custid = this.rout.snapshot.paramMap.get('id');
    this.custserv.getCustomerByID(parseInt(this.custid)).subscribe(data=>
      {
        this.selcustomer=data;
      })
    this.repserv
      .Custtransactions(parseInt(this.custid), AccountType.Customer,this.date)
      .subscribe((data) => {
        this.transactions = data;
        this.transactions.forEach((element) => {
          element.Name = this.selcustomer.name;
          if(element.type==TransType.Get)
          { this.Total+=element.amount;}
        });
      });
  }

  Print() {
    let printContents = document.getElementById("print").innerHTML;
    let originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
  
    window.print();
  
    document.body.innerHTML = originalContents;
   }

}
