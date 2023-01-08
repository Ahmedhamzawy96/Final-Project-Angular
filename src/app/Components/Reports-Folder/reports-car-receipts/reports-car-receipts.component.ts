import { CarService } from 'src/app/Services/Car/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { ICar } from 'src/app/Interface/ICar';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { Operation } from 'src/app/Interface/Enums/operation';

@Component({
  selector: 'app-reports-car-receipts',
  templateUrl: './reports-car-receipts.component.html',
  styleUrls: ['./reports-car-receipts.component.css']
})
export class ReportsCARReceiptsComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private carserv: CarService,
    private repserv: ReportService
  ) {}
  transactions: ITransactions[];
  transactionsReceipts: ITransactions[] = [];

  BillDate: string = new Date().toLocaleString();
  selcar: ICar;
  carid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.carid = this.rout.snapshot.paramMap.get('id');
    this.carserv.getCarByID(parseInt(this.carid)).subscribe((data) => {
      this.selcar = data;
      this.repserv
        .Custtransactions(
          parseInt(this.carid),
          AccountType.Car,
          this.date
        )
        .subscribe((data) => {
          this.transactions = data;
          this.transactions.forEach(element => {
            if (element.operation == Operation.ExportReciept&&element.accountType==AccountType.Car)
              {
                element.Name=this.selcar.name
                this.transactionsReceipts.push(element);
                this.Total+=(element.paid+element.remaining);
                this.totalPaid+=element.paid;
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
