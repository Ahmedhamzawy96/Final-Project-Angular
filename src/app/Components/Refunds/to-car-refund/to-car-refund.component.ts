import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IProduct } from 'src/app/Interface/IProduct';
import { CarService } from 'src/app/Services/Car/car.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RefundService } from 'src/app/Services/Refund/refund.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-car-refund',
  templateUrl: './to-car-refund.component.html',
  styleUrls: ['./to-car-refund.component.css'],
})
export class ToCarRefundComponent implements OnInit {
  recieptID: string;
  ExportReciept: IExportReciept;
  CarName: string;
  Selectedproduct: IProduct;
  tableNotValid: boolean = false;
  newRecieptProducts: IExportProduct[] = [];
  refundRec: FormGroup;
  NewRecieptValue: number = 0;
  BillDate: string = new Date().toLocaleString();

  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CarSer: CarService,
    private prodsServ: ProductService,
    private refundServ: RefundService,
    private route: Router
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
        text: ' كمية المترجع اكبر من الصفر  ',
      });
      input.value = '0';
    } else {
      let newPro = this.newRecieptProducts.find((A) => A.productID == id);
      if (newPro == null) {
        let value: number = 0;
        if (quantity == mainProd.quantity) {
          this.newRecieptProducts.push({
            quantity: 0,
            productID: mainProd.productID,
            productName: mainProd.productName,
            productPrice: mainProd.productPrice,
            totalPrice: mainProd.totalPrice,
          });
        } else {
          if (quantity < mainProd.quantity) {
            this.newRecieptProducts.push({
              quantity: mainProd.quantity - quantity,
              productID: mainProd.productID,
              productName: mainProd.productName,
              productPrice: mainProd.productPrice,
              totalPrice:
                mainProd.productPrice * (mainProd.quantity - quantity),
            });
          } else {
            this.newRecieptProducts.push({
              quantity: mainProd.quantity,
              productID: mainProd.productID,
              productName: mainProd.productName,
              productPrice: mainProd.productPrice,
              totalPrice: mainProd.totalPrice,
            });
          }
        }
        this.newRecieptProducts.forEach((element) => {
          value += element.productPrice * element.quantity;
        });
        this.NewRecieptValue = value;
      } else {
        console.log(newPro);
        let value: number = 0;
        newPro.quantity = mainProd.quantity - quantity;
        newPro.totalPrice =
          mainProd.productPrice * (mainProd.quantity - quantity);
        this.newRecieptProducts.forEach((element) => {
          value += element.productPrice * element.quantity;
        });
        this.NewRecieptValue = value;
      }
      this.tableNotValid = false;
      ref.checked = false;
    }
  }
  tab() {
    if (this.newRecieptProducts.length != 0) {
      this.ExportReciept.products.forEach((element) => {
        if (
          !this.newRecieptProducts.find((A) => A.productID == element.productID)
        ) {
          this.newRecieptProducts.push({
            productID: element.productID,
            productName: element.productName,
            productPrice: element.productPrice,
            quantity: element.quantity,
            totalPrice: element.totalPrice,
          });
        }
      });
    }
    let value: number = 0;
    this.newRecieptProducts.forEach((element) => {
      value += element.productPrice * element.quantity;
    });
    this.NewRecieptValue = value;
  }

  onSubmit() {
    debugger;
    let total: number = 0;
    this.newRecieptProducts.forEach((element) => {
      total += element.totalPrice;
    });
    this.refundRec = new FormGroup({
      total: new FormControl(total),
      notes: new FormControl(
        `${this.ExportReciept.id}  فاتورة مرتجع لفاتورة اصل رقم`
      ),
      date: new FormControl(this.BillDate),
      paid: new FormControl(0),
      remaining: new FormControl(this.NewRecieptValue),
      carID: new FormControl(this.ExportReciept.carID),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
    });
    this.newRecieptProducts = this.newRecieptProducts.filter(
      (A) => A.quantity != 0
    );
    let rec: IExportReciept = this.refundRec.value;
    if (this.newRecieptProducts.length != 0 || rec.total != 0) {
      rec.products = this.newRecieptProducts;
      this.refundServ
        .toCarRecRefund(this.ExportReciept.id, rec)
        .subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم حفظ المرتجع بنجاح',
          });
          this.route.navigate(['CarRecieptPrint', data]);
        });
    } else if (this.newRecieptProducts.length == 0 && rec.total == 0 ) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: ' لا يوجد مرتجع',
      });
    }
  }
  ngOnInit(): void {
    this.recieptID = this.rout.snapshot.paramMap.get('id');
    this.reciept.getRecieptsByID(Number(this.recieptID)).subscribe((Data) => {
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
