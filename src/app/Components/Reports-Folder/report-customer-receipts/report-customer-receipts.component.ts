import { Operation } from 'src/app/Interface/Enums/operation';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';

@Component({
  selector: 'app-report-customer-receipts',
  templateUrl: './report-customer-receipts.component.html',
  styleUrls: ['./report-customer-receipts.component.css'],
})
export class ReportCustomerReceiptsComponent implements OnInit {
  constructor(
    private transerve: TransactionsService,
    private rout: ActivatedRoute,
    private custserv: CustService,
    private repserv: ReportService
  ) {}
  transactions: ITransactions[];
  transactionsReceipts: ITransactions[] = [];

  BillDate: string = new Date().toLocaleString();
  selcustomer: ICustomer;
  custid: string;
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  Total: number = 0;
  totalPaid: number = 0;
  ngOnInit(): void {
    this.custid = this.rout.snapshot.paramMap.get('id');
    this.custserv.getCustomerByID(parseInt(this.custid)).subscribe((data) => {
      this.selcustomer = data;
      this.repserv
        .Custtransactions(
          parseInt(this.custid),
          AccountType.Customer,
          this.date
        )
        .subscribe((data) => {
          this.transactions = data;
          for (let index = 0; index < this.transactions.length; index++) {
            if (this.transactions[index].operation == Operation.ExportReciept) {
              this.transactionsReceipts.push(this.transactions[index]);
              this.totalPaid += this.transactions[index].paid;
            }
          }
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
