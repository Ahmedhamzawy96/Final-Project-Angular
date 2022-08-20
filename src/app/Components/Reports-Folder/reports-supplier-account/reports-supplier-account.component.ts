import { ISupplier } from 'src/app/Interface/ISupplier';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';

@Component({
  selector: 'app-reports-supplier-account',
  templateUrl: './reports-supplier-account.component.html',
  styleUrls: ['./reports-supplier-account.component.css']
})
export class ReportsSupplierAccountComponent implements OnInit {
  constructor(private transerve:TransactionsService,private rout : ActivatedRoute,private SUPserv:SupplierService,private repserv:ReportService) { }
transactions:ITransactions[];
BillDate: string = new Date().toLocaleString();
selsupplier: ISupplier;
SUPid:string;
Date:string=new Date().toLocaleString();
date:Date[]=this.repserv.getDates();
Total:number=0;
totalPaid:number=0;

  ngOnInit(): void {
    this.SUPid = this.rout.snapshot.paramMap.get('id');
    this.SUPserv.getSupplierByID(parseInt(this.SUPid)).subscribe(data=>
      {
        this.selsupplier=data;
        this.repserv
        .Custtransactions(parseInt(this.SUPid), AccountType.Supplier,this.date)
        .subscribe((data) => {
          this.transactions = data;
          this.transactions.forEach((element) => {
            element.Name = this.selsupplier.name;
            if(element.type==TransType.Get)
            { this.Total+=element.amount;
            }
            else if(element.type==TransType.Paid){
              this.totalPaid+=element.amount;
            }
          });
        });
      })

  }

  Print() {
    let printContents = document.getElementById("print").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print(); 
    document.body.innerHTML = originalContents;
   }
}
