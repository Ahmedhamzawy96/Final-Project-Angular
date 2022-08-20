import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IProduct } from 'src/app/Interface/IProduct';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-rec-refund',
  templateUrl: './export-rec-refund.component.html',
  styleUrls: ['./export-rec-refund.component.css'],
})
export class ExportRecRefundComponent implements OnInit {
  recieptID: string;
  ExportReciept: IExportReciept;
  CustomerName: string;
  Selectedproduct: IProduct;
  tableNotValid: boolean = false;
  newRecieptProducts: IExportProduct[] = [];
  NewRecieptValue: number = 0;

  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CustSer: CustService,
    private prodsServ: ProductService
  ) {}

  changeTable(
    id: Number,
    value: any,
    ref: HTMLInputElement,
    input: HTMLInputElement
  ) {
    this.NewRecieptValue = 0;
    let quantity = Number(value);
    this.tableNotValid = true;
    let mainProd = this.ExportReciept.products.find((A) => A.productID == id);
    if (quantity > mainProd.quantity) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: ' كمية المترجع لا تتعدي كمية صنف في الفاتورة ',
      });
      input.value = '0';
    } else if (quantity < 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: ' كمية المترجع لكبر من الصفر  ',
      });
      input.value = '0';
    } else {
      if (quantity > 0) {
        let newPro = this.newRecieptProducts.find((A) => A.productID == id);
        if (newPro == null) {
          let value: number = 0;
          this.newRecieptProducts.push({
            quantity: quantity,
            productID: mainProd.productID,
            productName: mainProd.productName,
            productPrice: mainProd.productPrice,
            totalPrice: mainProd.productPrice * quantity,
          });
          this.newRecieptProducts.forEach((element) => {
            value += element.productPrice * element.quantity;
          });
          this.NewRecieptValue = value;
        } else {
          let value: number = 0;
          newPro.quantity = quantity;
          newPro.totalPrice = mainProd.productPrice * quantity;
          this.newRecieptProducts.forEach((element) => {
            value += element.productPrice * element.quantity;
          });
          this.NewRecieptValue = value;
        }
      }
      this.tableNotValid = false;
      ref.checked = false;
    }
  }

  ngOnInit(): void {
    this.recieptID = this.rout.snapshot.paramMap.get('id');
    this.reciept.getRecieptsByID(3).subscribe((Data) => {
      this.ExportReciept = Data;
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
