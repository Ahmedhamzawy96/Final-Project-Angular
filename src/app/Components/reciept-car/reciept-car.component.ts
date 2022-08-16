import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { CarService } from 'src/app/Services/Car/car.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-reciept-car',
  templateUrl: './reciept-car.component.html',
  styleUrls: ['./reciept-car.component.css'],
})
export class RecieptCarComponent implements OnInit {
  recieptID: string;
  ExportReciept: IExportReciept;
  CarName: string;
  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CartSer: CarService,
    private prodsServ: ProductService
  ) {}
  Print() {
    let printContents = document.getElementById('main').innerHTML;
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
      this.CartSer.getCarByID(this.ExportReciept.carID).subscribe((Date) => {
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
