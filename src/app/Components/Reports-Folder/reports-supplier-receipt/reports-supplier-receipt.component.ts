import { ISupplier } from 'src/app/Interface/ISupplier';
import { SupplierService } from './../../../Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { Operation } from 'src/app/Interface/Enums/operation';

@Component({
  selector: 'app-reports-supplier-receipt',
  templateUrl: './reports-supplier-receipt.component.html',
  styleUrls: ['./reports-supplier-receipt.component.css'],
})
export class ReportsSupplierReceiptComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private SUPtserv: SupplierService,
    private repserv: ReportService
  ) {}
  transactions: ITransactions[];
  transactionsReceipts: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();
  selSupplier: ISupplier;
  Supid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.Supid = this.rout.snapshot.paramMap.get('id');
    this.SUPtserv.getSupplierByID(parseInt(this.Supid)).subscribe((data) => {
      this.selSupplier = data;
      this.repserv
        .Custtransactions(parseInt(this.Supid), AccountType.Supplier, this.date)
        .subscribe((data) => {
          this.transactions = data;
          console.log(data);
          this.transactions.forEach((element) => {
            if (element.operation == Operation.ImportReciept) {
              element.Name = this.selSupplier.name;
              this.transactionsReceipts.push(element);
              this.Total += element.paid + element.remaining;
              this.totalPaid += element.paid;
            }
          });
        });
    });
  }

  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
