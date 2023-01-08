import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';

@Component({
  selector: 'app-reports-supplier-total',
  templateUrl: './reports-supplier-total.component.html',
  styleUrls: ['./reports-supplier-total.component.css']
})
export class ReportsSupplierTotalComponent implements OnInit {

  Suppliers:ISupplier[];
  TotalAcc:number = 0;
  constructor(private SuppSer:SupplierService) { }

  ngOnInit(): void {
    this.SuppSer.getSupplier().subscribe(Data => {
      this.Suppliers = Data;
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
