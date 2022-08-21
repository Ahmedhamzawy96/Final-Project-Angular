import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IImportProduct } from 'src/app/Interface/IImportProduct';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { IProduct } from 'src/app/Interface/IProduct';
import { ImportReceiptService } from 'src/app/Services/Import Receipt/import-receipt.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RefundService } from 'src/app/Services/Refund/refund.service';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-rec-refund',
  templateUrl: './import-rec-refund.component.html',
  styleUrls: ['./import-rec-refund.component.css'],
})
export class ImportRecRefundComponent implements OnInit {
  recieptID: string;
  ImportReciept: IImportReciept;
  SupplierName: string;
  Selectedproduct: IProduct;
  tableNotValid: boolean = false;
  newRecieptProducts: IImportProduct[] = [];
  refundRec: FormGroup;
  NewRecieptValue: number = 0;
  BillDate: string = new Date().toLocaleString();

  constructor(
    private rout: ActivatedRoute,
    private reciept: ImportReceiptService,
    private SuppSer: SupplierService,
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
    let mainProd = this.ImportReciept.importProducts.find(
      (A) => A.productID == id
    );
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
              buyingPrice: mainProd.buyingPrice,
              totalPrice: mainProd.buyingPrice * (mainProd.quantity - quantity),
            });
          }
          this.newRecieptProducts.forEach((element) => {
            value += element.buyingPrice * element.quantity;
          });
          this.NewRecieptValue = value;
        } else {
          let value: number = 0;
          newPro.quantity = mainProd.quantity - quantity;
          newPro.totalPrice =
            mainProd.buyingPrice * (mainProd.quantity - quantity);
          this.newRecieptProducts.forEach((element) => {
            value += element.buyingPrice * element.quantity;
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
        `${this.ImportReciept.id}  فاتورة مرتجع لفاتورة اصل رقم`
      ),
      date: new FormControl(this.BillDate),
      paid: new FormControl(0),
      remaining: new FormControl(this.NewRecieptValue),
      supid: new FormControl(this.ImportReciept.supid),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
    });
    if (this.newRecieptProducts.length != 0) {
      let rec: IImportReciept = this.refundRec.value;
      rec.importProducts = this.newRecieptProducts;
      this.refundServ
        .importRecRefund(this.ImportReciept.id, rec)
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
      this.ImportReciept = Data;
      this.SuppSer.getSupplierByID(this.ImportReciept.supid).subscribe(
        (Date) => {
          this.SupplierName = Date.name;
        }
      );
      this.ImportReciept.importProducts.forEach((element) => {
        this.prodsServ
          .getProductsByID(<number>element.productID)
          .subscribe((Data) => {
            this.ImportReciept.importProducts.find(
              (pro) => pro.productID == element.productID
            ).productName = Data.name;
          });
      });
    });
  }
}
