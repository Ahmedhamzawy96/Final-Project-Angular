import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { Operation } from 'src/app/Interface/Enums/operation';
import { TransType } from 'src/app/Interface/Enums/TransType';

@Component({
  selector: 'app-reports-car-account',
  templateUrl: './reports-car-account.component.html',
  styleUrls: ['./reports-car-account.component.css'],
})
export class ReportsCARAccountComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private CARserv: CarService,
    private repserv: ReportService
  ) {}
  transactions: ITransactions[];
  BillDate: string = new Date().toLocaleString();
  selCAR: ICar;
  CARid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;

  ngOnInit(): void {
    this.CARid = this.rout.snapshot.paramMap.get('id');
    this.CARserv.getCarByID(parseInt(this.CARid)).subscribe((data) => {
      this.selCAR = data;
      this.repserv
        .Custtransactions(parseInt(this.CARid), AccountType.Car, this.date)
        .subscribe((data) => {
          this.transactions = data;
          this.transactions.forEach((element) => {
            element.Name = this.selCAR.name;
            if (element.operation == Operation.ExportReciept) {
              this.Total += element.paid + element.remaining;
              this.totalPaid += element.paid;
            } else if (element.operation == Operation.CarTrans) {
              if (element.type == TransType.Paid) {
                this.Total += element.paid;
              } else if (element.type == TransType.Get) {
                this.totalPaid += element.paid;
              }
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
