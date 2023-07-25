import { TransType } from './../../../Interface/Enums/TransType';
import { Operation } from './../../../Interface/Enums/operation';
import { CustService } from './../../../Services/Customer/cust.service';
import { ITransactions } from './../../../Interface/ITransactions';
import { TransactionsService } from './../../../Services/transactions.service';
import { Component, OnInit, Type } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { RecieptPrintService } from 'src/app/Services/reciept-print.service';

@Component({
  selector: 'app-report-customer-accounts',
  templateUrl: './report-customer-accounts.component.html',
  styleUrls: ['./report-customer-accounts.component.css'],
})
export class ReportCustomerAccountsComponent implements OnInit {
  constructor(
    private transerve: TransactionsService,
    private rout: ActivatedRoute,
    private custserv: CustService,
    private repserv: ReportService,
    private printserv:RecieptPrintService
  ) {}
  transactions: ITransactions[];
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
          this.transactions.forEach((element) => {
            element.Name = this.selcustomer.name;
            if (element.operation == Operation.ExportReciept) {
              this.Total += element.paid + element.remaining;
              this.totalPaid += element.paid;
            }
             else if (element.operation == Operation.CustomerTrans) {
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
    this.printserv.CustomerAccounts(this.transactions,this.Total,this.totalPaid)
    .subscribe(data=>{
    console.log(data);
      const x = `data:application/pdf;base64,${data}`;
      var link = document.createElement('a');
    link.href = x;
    link.download = ` كشف حساب - ${this.selcustomer.name}.pdf`;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });
  }
}
