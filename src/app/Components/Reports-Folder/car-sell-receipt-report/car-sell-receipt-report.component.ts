import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICartotaltranswithname } from 'src/app/Interface/trans-wit-name';
import { Transacwithtotal } from 'src/app/Interface/transacwithtotal';
import { CarService } from 'src/app/Services/Car/car.service';
import { ReportService } from 'src/app/Services/Reports/report.service';

@Component({
  selector: 'app-car-sell-receipt-report',
  templateUrl: './car-sell-receipt-report.component.html',
  styleUrls: ['./car-sell-receipt-report.component.css']
})
export class CarSellReceiptReportComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private carserv: CarService,
    private repserv: ReportService
  ) {}
  transactions: ICartotaltranswithname;
  

  BillDate: string = new Date().toLocaleString();
  carid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.carid = this.rout.snapshot.paramMap.get('id');
    // this.carserv.getCarByID(parseInt(this.carid)).subscribe((data) => {
    //   this.selcar = data;
    //   this.repserv
    //     .Custtransactions(parseInt(this.carid), AccountType.Car, this.date)
    //     .subscribe((data) => {
    //       this.transactions = data;
    //       this.transactions.forEach((element) => {
    //         if (
    //           element.operation == Operation.ExportReciept &&
    //           element.accountType == AccountType.Car
    //         ) {
    //           element.Name = this.selcar.name;
    //           this.transactionsReceipts.push(element);
    //           this.Total += element.paid + element.remaining;
    //           this.totalPaid += element.paid;
    //         }
    //       });
    //     });
    // });
  
  this.repserv.getCarSellTransactions(parseInt(this.carid),this.date).subscribe
  ((data)=>{this.transactions=data  
  this.transactions.transactionandname.forEach((element)=>
  {
    this.totalPaid += element.transactions.paid;  }
  )
} )
  }

  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
