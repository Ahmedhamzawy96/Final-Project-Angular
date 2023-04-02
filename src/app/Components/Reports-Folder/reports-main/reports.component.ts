import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
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
custtransactionsReceipts:Number[]=[];
customers: ICustomer[];
selcustomer: ICustomer;
Custaccount:number;
customerID:any;
CustReceiptID:number;
CustCheckbox:boolean;
CustminDate = new Date();
CustmaxDate = new Date();
CustRangeValue: Date[];
//#endregion Cust
  

//#region SUP 
SUPtransactions:ITransactions[];
SUPtransactionsReceipts:Number[]=[];
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
CARtransactionsReceipts:Number[]=[];
CAREtransactions:ITransactions[];
CARtransactionsEReceipts:Number[]=[];
CARs: ICar[];
selCAR: ICar;
CARaccount:number;
CARID:number;
CARReceiptID:number;
CARCheckbox:boolean;
CarERCheckbox:boolean;
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
   {
    this.CustmaxDate.setDate(this.CustmaxDate.getDate() + 6);
    this.CustminDate.setDate(this.CustminDate.getDate() -1);
    this.CustRangeValue = [this.CustminDate, this.CustmaxDate];

    this.SUPmaxDate.setDate(this.SUPmaxDate.getDate() + 6);
    this.SUPminDate.setDate(this.SUPminDate.getDate() -1);
    this.SUPRangeValue = [this.SUPminDate, this.SUPmaxDate];

    this.CARmaxDate.setDate(this.CARmaxDate.getDate() + 6);
    this.CARminDate.setDate(this.CARminDate.getDate() -1);
    this.CARRangeValue = [this.CARminDate, this.CARmaxDate];

    this.TotalmaxDate.setDate(this.TotalmaxDate.getDate() + 6);
    this.TotalminDate.setDate(this.TotalminDate.getDate() -1);
    this.TotalRangeValue = [this.TotalminDate, this.TotalmaxDate];
    }

  ngOnInit(): void {
    this.csutServ.getCustomers().subscribe((data) => {
      this.customers = data;
    });

      this.SUPServ.getSupplier().subscribe((data)=>{
      this.Suppliers=data;
    });
    this.CARServ.getCar().subscribe((data)=>{
      this.CARs=data;
    });
  } 

//#region Cust
CustomerAccount(){
  this.repserv.addDates(this.CustRangeValue)
  this.router.navigate(['RCAccounts',this.customerID]);
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
    this.repserv.addDates(this.CustRangeValue)
    this.router.navigate(['RCReceipts',this.customerID]);
  }

}
fillCustomerReceipts()
{
  debugger;
  console.log(this.customerID);
  this.custtransactionsReceipts=[];
  this.transServ
  .transactionbytype(this.customerID, AccountType.Customer)
  .subscribe((data) => {
    this.custtransactions = data;
    console.log(this.custtransactions , data)

    for (let index = 0; index <this.custtransactions.length; index++) {
      if(this.custtransactions[index].operation==Operation.ExportReciept)
      {
        this.custtransactionsReceipts.push(this.custtransactions[index].operationID)
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
        this.SUPtransactionsReceipts.push(this.SUPtransactions[index].operationID)
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
          this.CARtransactionsReceipts.push(element.operationID);
        }
});
console.log(this.CARtransactionsReceipts);

})
this.transServ.Cartransactionbytype(this.CARID,AccountType.Customer)
.subscribe((data) => {
  this.CAREtransactions = data;
  this.CAREtransactions.forEach(element => {
    if(element.operation==Operation.ExportReciept&&element.accountType==AccountType.Customer)
      {
        this.CARtransactionsEReceipts.push(element.operationID);
      }
});
console.log(this.CARtransactionsEReceipts);

})


}
CARSellReceipt()
{
  debugger;
  if(this.CarERCheckbox)
  {
    this.router.navigate(['CarRecieptPrint',this.CARReceiptID]);
  }
  else
  {
    this.repserv.addDates(this.CARRangeValue);
    this.router.navigate(['CARSRR',this.CARID]);
  }
}
CARProfitMargin()
{
  this.repserv.addDates(this.CARRangeValue);
  this.router.navigate(['CarProfit',this.CARID]);
}
//#endregion CAR

//#region Total
Totaleceipts()
{
  this.repserv.addDates(this.TotalRangeValue)
  this.router.navigate(['RTotal']);
}
TotalStoreReceipts()
{
  this.repserv.addDates(this.TotalRangeValue)
  this.router.navigate(['ٌStoreNetProfit']);
}
StoreProfitMargin()
{
  this.repserv.addDates(this.TotalRangeValue)
  this.router.navigate(['StoreProfit']);
}
//#endregion Total

}
