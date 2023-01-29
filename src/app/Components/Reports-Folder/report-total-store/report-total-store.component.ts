import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transacwithtotal } from 'src/app/Interface/transacwithtotal';
import { ReportService } from 'src/app/Services/Reports/report.service';

@Component({
  selector: 'app-report-total-store',
  templateUrl: './report-total-store.component.html',
  styleUrls: ['./report-total-store.component.css']
})
export class ReportTotalStoreComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private repserv: ReportService
  ) {}
  transactions: Transacwithtotal;
  

  BillDate: string = new Date().toLocaleString();
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
  this.repserv.geTotalStore(this.date).subscribe
  ((data)=>{this.transactions=data
    console.log(this.transactions)
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
