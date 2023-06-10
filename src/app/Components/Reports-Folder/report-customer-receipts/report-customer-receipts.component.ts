import { Operation } from 'src/app/Interface/Enums/operation';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITransactions } from 'src/app/Interface/ITransactions';
 
 import { TransType } from 'src/app/Interface/Enums/TransType';

@Component({
  selector: 'app-report-customer-receipts',
  templateUrl: './report-customer-receipts.component.html',
  styleUrls: ['./report-customer-receipts.component.css'],
})
export class ReportCustomerReceiptsComponent implements OnInit {
  customers: ICustomer[];
customerID:any;
  CustCheckbox: any;
  router: any;
  CustReceiptID: any;
  custtransactionsReceipts: any[];
  transServ: any;
  custtransactions: any;
  CustRangeValue: Date[];
  constructor(
     private rout: ActivatedRoute,
  
  ) {}
  transactions: ITransactions[];
  transactionsReceipts: ITransactions[] = [];

  BillDate: string = new Date().toLocaleString();
  selcustomer: ICustomer;
  custid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = [new Date()];
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.custid = this.rout.snapshot.paramMap.get('id');
 
  }

  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }


  CustomerReceipts()
{
  debugger;
  if(this.CustCheckbox)
  {
    this.router.navigate(['ExportRecieptPrint',this.CustReceiptID]);
  }
  else
  {
     this.router.navigate(['RCReceipts',this.customerID]);
  }

}
   
fillCustomerReceipts()
{
  debugger;
  console.log(this.customerID);
  this.custtransactionsReceipts=[];
 
}
}
