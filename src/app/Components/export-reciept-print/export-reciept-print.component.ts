import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-export-reciept-print',
  templateUrl: './export-reciept-print.component.html',
  styleUrls: ['./export-reciept-print.component.css'],
})
export class ExportRecieptPrintComponent implements OnInit {
  recieptID: string;
  ExportReciept: IExportReciept;
  CustomerName: string;
  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CustSer: CustService,
    private prodsServ: ProductService
  ) {}
  Print() {
    let printContents = document.getElementById('Print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  ngOnInit(): void {
    this.recieptID = this.rout.snapshot.paramMap.get('id');
    this.reciept.getRecieptsByID(parseInt(this.recieptID)).subscribe((Data) => {
      this.ExportReciept = Data;
      console.log(this.ExportReciept);
      this.CustSer.getCustomerByID(this.ExportReciept.customerID).subscribe(
        (Date) => {
          this.CustomerName = Date.name;
        }
      );
      this.ExportReciept.products.forEach((element) => {
        this.prodsServ
          .getProductsByID(<number>element.productID)
          .subscribe((Data) => {
            this.ExportReciept.products.find(
              (pro) => pro.productID == element.productID
            ).productName = Data.name;
          });
      });
    });
  }
}
