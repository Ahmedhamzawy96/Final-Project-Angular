import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { CustService } from 'src/app/Services/Customer/cust.service';

@Component({
  selector: 'app-reports-customer-total',
  templateUrl: './reports-customer-total.component.html',
  styleUrls: ['./reports-customer-total.component.css']
})
export class ReportsCustomerTotalComponent implements OnInit {
  Customers:ICustomer[];
  TotalAcc:number = 0;
  constructor(private custServ:CustService) { }

  ngOnInit(): void {
    this.custServ.getCustomers().subscribe(Data => {
      this.Customers = Data;
      Data.forEach(element => {
        this.TotalAcc += Number(element.account);
      });
    })
  }
  
  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
