import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { ReportService } from './../../../Services/Reports/report.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { Operation } from 'src/app/Interface/Enums/operation';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

//#region Cust 
custtransactions:ITransactions[];
custtransactionsReceipts:ITransactions[]=[];
customers: ICustomer[];
selcustomer: ICustomer;
Custaccount:number;
customerID:number;
CustReceiptID:number;
CustCheckbox:boolean;
CustminDate = new Date();
CustmaxDate = new Date();
CustRangeValue: Date[];
//#endregion Cust
  

//#region SUP 
SUPtransactions:ITransactions[];
SUPtransactionsReceipts:ITransactions[]=[];
Suppliers: ISupplier[];
selSuplier: ISupplier;
SUPaccount:number;
SUPID:number;
SUPReceiptID:number;
SUPCheckbox:boolean;
SUPminDate = new Date();
SUPmaxDate = new Date();
SUPRangeValue: Date[];
//#endregion Cust
  

  constructor(  private csutServ: CustService ,private SUPServ: SupplierService ,private router:Router,private repserv:ReportService,private transServ:TransactionsService)
   {
    this.CustmaxDate.setDate(this.CustmaxDate.getDate() + 7);
    this.CustRangeValue = [this.CustminDate, this.CustmaxDate];

    this.SUPmaxDate.setDate(this.SUPmaxDate.getDate() + 7);
    this.SUPRangeValue = [this.SUPminDate, this.SUPmaxDate];
    }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });

      this.SUPServ.getSupplier().subscribe((data)=>{
      this.Suppliers=data;
    });
  } 

//#region Cust
CustomerAccount(){
  this.repserv.addDates(this.CustRangeValue)
  this.router.navigate(['RCAccounts',this.customerID]);
}
CustomerReceipts()
{
  if(this.CustCheckbox)
  {
    this.router.navigate(['ExportRecieptPrint',this.CustReceiptID]);
  }
  else
  {
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RCReceipts',this.customerID]);
  }

}
fillCustomerReceipts()
{
  this.custtransactionsReceipts=[];
  this.transServ
  .transactionbytype(this.customerID, AccountType.Customer)
  .subscribe((data) => {
    this.custtransactions = data;

    for (let index = 0; index <this.custtransactions.length; index++) {
      if(this.custtransactions[index].operation==Operation.ExportReciept)
      {
        this.custtransactionsReceipts.push(this.custtransactions[index])
      }
    }

})
}
//#endregion Cust

//#region SUP
SupplierAccount(){
  this.repserv.addDates(this.SUPRangeValue)
  this.router.navigate(['RSAccounts',this.SUPID]);
}
SupplierReceipts()
{
  if(this.SUPCheckbox)
  {
    this.router.navigate(['ImportRecieptPrint',this.SUPReceiptID]);
  }
  else
  {
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RSReceipts',this.SUPID]);
  }

}
fillSupplierReceipts()
{
  this.SUPtransactionsReceipts=[];
  this.transServ
  .transactionbytype(this.SUPID, AccountType.Supplier)
  .subscribe((data) => {
    this.SUPtransactions = data;

    for (let index = 0; index <this.SUPtransactions.length; index++) {
      if(this.SUPtransactions[index].operation==Operation.ImportReciept)
      {
        console.log(this.SUPtransactions[index])
        this.SUPtransactionsReceipts.push(this.SUPtransactions[index])
      }
    }
})
}
//#endregion SUP


}
