<<<<<<< Updated upstream
=======
import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
>>>>>>> Stashed changes
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
  
<<<<<<< Updated upstream
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
=======

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


//#region CAR
CARtransactions:ITransactions[];
CARtransactionsReceipts:ITransactions[]=[];
CARs: ICar[];
selCAR: ICar;
CARaccount:number;
CARID:number;
CARReceiptID:number;
CARCheckbox:boolean;
CARminDate = new Date();
CARmaxDate = new Date();
CARRangeValue: Date[];
//#endregion CAR 
//#region total
TotalminDate = new Date();
TotalmaxDate = new Date();
TotalRangeValue: Date[];
//#endregion total
  constructor(  private csutServ: CustService ,private SUPServ: SupplierService ,private router:Router,private repserv:ReportService
    ,private transServ:TransactionsService,private CARServ:CarService)
>>>>>>> Stashed changes
   {
    this.CustmaxDate.setDate(this.CustmaxDate.getDate() + 6);
    this.CustminDate.setDate(this.CustminDate.getDate() -1);
    this.CustRangeValue = [this.CustminDate, this.CustmaxDate];
<<<<<<< Updated upstream
=======

    this.SUPmaxDate.setDate(this.SUPmaxDate.getDate() + 6);
    this.SUPminDate.setDate(this.SUPminDate.getDate() -1);
    this.SUPRangeValue = [this.SUPminDate, this.SUPmaxDate];

    this.CARmaxDate.setDate(this.CARmaxDate.getDate() + 6);
    this.CARminDate.setDate(this.CARminDate.getDate() -1);
    this.CARRangeValue = [this.CARminDate, this.CARmaxDate];

    this.TotalmaxDate.setDate(this.TotalmaxDate.getDate() + 6);
    this.TotalminDate.setDate(this.TotalminDate.getDate() -1);
    this.TotalRangeValue = [this.TotalminDate, this.TotalmaxDate];
>>>>>>> Stashed changes
    }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });} 

<<<<<<< Updated upstream
=======
      this.SUPServ.getSupplier().subscribe((data)=>{
      this.Suppliers=data;
    });
    this.CARServ.getCar().subscribe((data)=>{
      this.CARs=data;
    });
  } 
>>>>>>> Stashed changes

  CustomerAccount(){
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RCAccounts',this.customerID]);
  }
  CustomerReceipts()
  {
<<<<<<< Updated upstream
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['ImportRecieptPrint',this.customerID]);
  }
=======
    this.repserv.addDates(this.SUPRangeValue)
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


//#region CAR
CARAccount(){
  this.repserv.addDates(this.CARRangeValue)
  this.router.navigate(['RCARAccounts',this.CARID]);
}
CARReceipts()
{
  if(this.CARCheckbox)
  {
    this.router.navigate(['CarRecieptPrint',this.CARReceiptID]);
  }
  else
  {
    this.repserv.addDates(this.CARRangeValue)
    this.router.navigate(['RCARReceipts',this.CARID]);
  }

}
fillCARReceipts()
{
  this.CARtransactionsReceipts=[];
  this.transServ
  .transactionbytype(this.CARID, AccountType.Car)
  .subscribe((data) => {
    this.CARtransactions = data;
this.CARtransactions.forEach(element => {
  if(element.operation==Operation.ExportReciept&&element.accountType==AccountType.Car)
      {
        this.CARtransactionsReceipts.push(element)
      }
});

})
}
//#endregion CAR

//#region Total
Totaleceipts()
{
  this.repserv.addDates(this.TotalRangeValue)
  this.router.navigate(['RTotal']);

}
//#endregion Total

>>>>>>> Stashed changes
}
