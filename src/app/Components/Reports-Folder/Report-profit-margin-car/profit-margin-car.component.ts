import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IProfitMargin } from 'src/app/Interface/iprofit-margin';
import { ReportService } from 'src/app/Services/Reports/report.service';

@Component({
  selector: 'app-profit-margin-car',
  templateUrl: './profit-margin-car.component.html',
  styleUrls: ['./profit-margin-car.component.css']
})
export class ProfitMarginCarComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private repserv: ReportService
  ) {}
  ProfitMargin:IProfitMargin;
  carid: string;
  Date: string = new Date().toLocaleString();
  date: Date[];
  ngOnInit(): void {
    this.date=this.repserv.getDates();
    this.carid = this.rout.snapshot.paramMap.get('id');
    this.repserv.ProfitMarginforCar(this.date,parseInt(this.carid)).subscribe((data) => {
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
