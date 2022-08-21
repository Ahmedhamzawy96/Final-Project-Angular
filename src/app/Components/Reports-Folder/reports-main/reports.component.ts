<<<<<<< HEAD
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
=======
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { ISupplier } from 'src/app/Interface/ISupplier';
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
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
  
<<<<<<< HEAD
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
  

  constructor(  private csutServ: CustService ,private SUPServ: SupplierService ,private router:Router,private repserv:ReportService,private transServ:TransactionsService)
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
   {
    this.CustmaxDate.setDate(this.CustmaxDate.getDate() + 6);
    this.CustminDate.setDate(this.CustminDate.getDate() -1);
    this.CustRangeValue = [this.CustminDate, this.CustmaxDate];
<<<<<<< HEAD
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
=======

    this.SUPmaxDate.setDate(this.SUPmaxDate.getDate() + 7);
    this.SUPRangeValue = [this.SUPminDate, this.SUPmaxDate];
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
    }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });

<<<<<<< HEAD
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
=======
      this.SUPServ.getSupplier().subscribe((data)=>{
      this.Suppliers=data;
    });
  } 
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb

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
<<<<<<< Updated upstream
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RCReceipts',this.customerID]);
  }
<<<<<<< HEAD
=======
    this.repserv.addDates(this.SUPRangeValue)
=======

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
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
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


<<<<<<< HEAD
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
=======
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
}
