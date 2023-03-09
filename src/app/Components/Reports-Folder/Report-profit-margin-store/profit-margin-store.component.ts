import { Component, OnInit } from '@angular/core';
import { IProfitMargin } from 'src/app/Interface/iprofit-margin';
import { ReportService } from 'src/app/Services/Reports/report.service';

@Component({
  selector: 'app-profit-margin-store',
  templateUrl: './profit-margin-store.component.html',
  styleUrls: ['./profit-margin-store.component.css']
})
export class ProfitMarginStoreComponent implements OnInit {

  constructor(
    private repserv: ReportService
  ) {}
  ProfitMargin:IProfitMargin;

  Date: string = new Date().toLocaleString();
  date: Date[];
  ngOnInit(): void {
    this.date=this.repserv.getDates();
    this.repserv.ProfitMarginforStore(this.date).subscribe((data) => {
    this.ProfitMargin = data;
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
