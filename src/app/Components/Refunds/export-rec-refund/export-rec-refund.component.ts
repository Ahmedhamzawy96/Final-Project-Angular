import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IProduct } from 'src/app/Interface/IProduct';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RefundService } from 'src/app/Services/Refund/refund.service';
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
  refundRec: FormGroup;
  NewRecieptValue: number = 0;
  BillDate: string = new Date().toLocaleString();

  constructor(
    private rout: ActivatedRoute,
    private reciept: ExportRecieptService,
    private CustSer: CustService,
    private prodsServ: ProductService,
    private refundServ: RefundService
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
      if (quantity >= 0) {
        let newPro = this.newRecieptProducts.find((A) => A.productID == id);
        if (newPro == null) {
          let value: number = 0;
          if (quantity != 0) {
            this.newRecieptProducts.push({
              quantity: mainProd.quantity - quantity,
              productID: mainProd.productID,
              productName: mainProd.productName,
              productPrice: mainProd.productPrice,
              totalPrice:
                mainProd.productPrice * (mainProd.quantity - quantity),
            });
          }
          this.newRecieptProducts.forEach((element) => {
            value += element.productPrice * element.quantity;
          });
          this.NewRecieptValue = value;
        } else {
          let value: number = 0;
          newPro.quantity = mainProd.quantity - quantity;
          newPro.totalPrice =
            mainProd.productPrice * (mainProd.quantity - quantity);
          this.newRecieptProducts.forEach((element) => {
            value += element.productPrice * element.quantity;
          });
          this.NewRecieptValue = value;
        }
      }
      this.tableNotValid = false;
      ref.checked = false;
      console.log(this.newRecieptProducts);
    }
  }

  onSubmit() {
    let total: number = 0;
    this.newRecieptProducts.forEach((element) => {
      if (element.quantity == 0) {
        let index = this.newRecieptProducts.indexOf(element);
        this.newRecieptProducts.splice(index, 1);
      } else {
        total += element.totalPrice;
      }
    });
    this.refundRec = new FormGroup({
      total: new FormControl(total),
      notes: new FormControl(
        `${this.ExportReciept.id}  فاتورة مرتجع لفاتورة اصل رقم`
      ),
      date: new FormControl(this.BillDate),
      paid: new FormControl(0),
      remaining: new FormControl(this.NewRecieptValue),
      customerID: new FormControl(this.ExportReciept.customerID),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
    });
    if (this.newRecieptProducts.length != 0) {
      let rec: IExportReciept = this.refundRec.value;
      rec.products = this.newRecieptProducts;
      this.refundServ
        .exportRecRefund(this.ExportReciept.id, rec)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم حفظ المرتجع بنجاح',
          });
        });
    } else {
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
      console.log(Data);
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
