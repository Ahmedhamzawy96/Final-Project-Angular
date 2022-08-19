import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { ImportReceiptService } from 'src/app/Services/Import Receipt/import-receipt.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';

@Component({
  selector: 'app-reciept-print',
  templateUrl: './reciept-print.component.html',
  styleUrls: ['./reciept-print.component.css'],
})
export class RecieptPrintComponent implements OnInit {
  recieptID: string;
  ImportReciept: IImportReciept;
  SuppLierName: string;
  constructor(
    private rout: ActivatedRoute,
    private reciept: ImportReceiptService,
    private suppSer: SupplierService,
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
      this.ImportReciept = Data;
      this.suppSer
        .getSupplierByID(this.ImportReciept.supid)
        .subscribe((Date) => {
          this.SuppLierName = Date.name;
        });
      this.ImportReciept.importProducts.forEach((element) => {
        this.prodsServ.getProductsByID(element.productID).subscribe((Data) => {
          this.ImportReciept.importProducts.find(
            (pro) => pro.productID == element.productID
          ).productName = Data.name;
        });
      });
    });
  }
}
