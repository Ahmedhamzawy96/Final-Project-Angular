import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { CarService } from 'src/app/Services/Car/car.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RecieptPrintService } from 'src/app/Services/reciept-print.service';

@Component({
  selector: 'app-car-rec-print',
  templateUrl: './car-rec-print.component.html',
  styleUrls: ['./car-rec-print.component.css'],
})
export class CarRecPrintComponent implements OnInit {
  recieptID: string;
  ExportReciept: IExportReciept;
  CarName: string;
  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CarSer: CarService,
    private prodsServ: ProductService,
    private PrintReciept:RecieptPrintService

  ) {}
  Print() {
    this.PrintReciept.ExportCarRecieptPrint(this.ExportReciept.id).subscribe(data => {
      const x = `data:application/pdf;base64,${data}`;
      var link = document.createElement('a');
    link.href = x;
    link.download = `فاتورة رقم - ${this.ExportReciept.id}.pdf`;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });
    // let printContents = document.getElementById('main').innerHTML;
    // let originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
  }

  ngOnInit(): void {
    this.recieptID = this.rout.snapshot.paramMap.get('id');
    this.reciept.getRecieptsByID(parseInt(this.recieptID)).subscribe((Data) => {
      this.ExportReciept = Data;
      this.CarSer.getCarByID(this.ExportReciept.carID).subscribe((Date) => {
        this.CarName = Date.name;
      });
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
