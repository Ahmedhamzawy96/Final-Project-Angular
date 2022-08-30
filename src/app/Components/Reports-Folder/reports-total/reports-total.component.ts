import { reportTotal } from './../../../Interface/ReportTotal';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { Component, OnInit } from '@angular/core';
import { ITransactions } from 'src/app/Interface/ITransactions';

@Component({
  selector: 'app-reports-total',
  templateUrl: './reports-total.component.html',
  styleUrls: ['./reports-total.component.css'],
})
export class ReportsTotalComponent implements OnInit {
  constructor(private repoServ: ReportService) {}
  transactions: ITransactions[];
  Reporttotal: reportTotal;
  BillDate: string = new Date().toLocaleString();
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repoServ.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.repoServ.getImportProduct(this.date).subscribe((data) => {
      this.Reporttotal = data;
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
