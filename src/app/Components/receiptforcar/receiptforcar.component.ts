import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IExportReciept } from './../../Interface/IExportReciept';
import { ExportProductService } from './../../Services/ExportProduct/export-product.service';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { ProductService } from './../../Services/Product/product.service';
import { IProduct } from 'src/app/Interface/IProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-receiptforcar',
  templateUrl: './receiptforcar.component.html',
  styleUrls: ['./receiptforcar.component.css'],
})
export class ReceiptforcarComponent implements OnInit {
  ExportRecieptForm: FormGroup;
  Products: IProduct[] = [];
  Cars: ICar[] = [];
  ProductsAdded: IExportProduct[] = [];
  selectedid: number;
  PrdID: number = 0;
  Selectedproduct: IProduct;
  BillDate: string = new Date().toLocaleString();
  prdQuantity: number;
  prdPrice: number;
  totalreciept: number;
  paidreceipt: string = ' ';
  remainingreceipt: number;
  submit: boolean = false;
  tableNotValid: boolean = false;
  constructor(
    private CarServ: CarService,
    private Productserv: ProductService,
    private Exportserv: ExportRecieptService,
    private expProd: ExportProductService,
    private Route: Router
  ) {
    this.ExportRecieptForm = new FormGroup({
      total: new FormControl(),
      notes: new FormControl(''),
      date: new FormControl(this.BillDate),
      paid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
      ]),
      remaining: new FormControl(''),
      carID: new FormControl('', [Validators.required]),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
    });
  }

  ngOnInit(): void {
    this.CarServ.getCar().subscribe((data) => {
      this.Cars = data;
    });

    this.Productserv.getProducts().subscribe((data) => {
      this.Products = data;
    });
  }
  prdselect(id: number) {
    this.Selectedproduct = this.Products.find((w) => w.id == id);
    this.prdPrice = this.Selectedproduct.buyingPrice;
  }
  AddtoTable() {
    let prod = this.Selectedproduct;
    if (this.prdQuantity == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون الكمية اكبر من الصفر',
      });
    } else if (this.prdQuantity > prod.quantity) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'كمية الصنف في المخزن لا تسمح',
      });
    } else if (this.prdPrice < prod.buyingPrice || this.prdPrice == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'سعر البيع يجب ان يكون مساوي او اكبر من سعر البيع الاصلي',
      });
    } else if (this.ProductsAdded.find((A) => A.productID == prod.id)) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'تم اضافة الصنف من قبل ',
      });
    } else {
      this.ProductsAdded.push({
        productName: this.Selectedproduct.name,
        productPrice: this.prdPrice,
        quantity: this.prdQuantity,
        totalPrice: this.prdPrice * this.prdQuantity,
        productID: this.Selectedproduct.id,
      });
      this.totalReciept();
    }
    this.prdQuantity = null;
  }
  deletefromTable() {
    //#region
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'حذف  المنتج',
        text: 'هل انت متاكد من حذفه هذا المنتج',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',

        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let prod: IExportProduct = this.ProductsAdded.find(
            (pro) => pro.productID == this.selectedid
          );
          console.log(prod);
          let index: number = this.ProductsAdded.indexOf(prod);
          this.ProductsAdded.splice(index, 1);
          this.totalReciept();
          this.getRemain();
          swalWithBootstrapButtons.fire('تم الحذف', 'تم حذف المنتج', 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف المنتج', 'error');
        }
      });
    //#endregion
  }
  changeTable(id: Number, quantity: number, price: number) {
    this.tableNotValid = true;
    let mainProd = this.Products.find((A) => A.id == id);
    console.log(mainProd)
    let pro = this.ProductsAdded.find((prod) => prod.productID == id);
    if (quantity == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون الكمية اكبر من الصفر',
      });
    } else if (quantity > mainProd.quantity) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'كمية الصنف في المخزن لا تسمح',
      });
    } else if (price < mainProd.buyingPrice || price == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'سعر البيع يجب ان يكون مساوي او اكبر من سعر البيع الاصلي',
      });
    } else {
      pro.quantity = quantity;
      pro.productPrice = price;
      pro.totalPrice = price * quantity;
      this.totalReciept();
      this.tableNotValid = false;
    }
  }
  getRemain() {
    this.ExportRecieptForm.controls['remaining'].setValue(
      this.ExportRecieptForm.controls['total'].value -
        this.ExportRecieptForm.controls['paid'].value
    );
  }

  OnsSubmit() {
    this.submit = true;
    let receipt: IExportReciept = this.ExportRecieptForm.value;
    if (this.ProductsAdded.length == 0 && this.ExportRecieptForm.valid) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تحتوي الفاتورة علي صنف واحد علي الاقل ',
      });
    } else if (
      this.ExportRecieptForm.controls['total'].value <
      this.ExportRecieptForm.controls['paid'].value
    ) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان يكون المبلغ المدفوع اقل من او يساوي اجمالي الفاتورة ',
      });
    } else if (
      this.ProductsAdded.length > 0 &&
      this.ExportRecieptForm.valid &&
      !this.tableNotValid
    ) {
      console.log('hi');
      console.log(this.ProductsAdded);

      receipt.products = this.ProductsAdded;
      console.log(receipt);

      this.Exportserv.addReciept(receipt).subscribe((data) => {
        this.ExportRecieptForm.reset();
        this.submit = true;
        this.Route.navigate(['CarRecieptPrint', data.id]);
        console.log('hi');
      });
    }
  }
  totalReciept() {
    let total: number = 0;
    for (let item of this.ProductsAdded) {
      total += item.totalPrice;
    }
    this.totalreciept = total;
  }
  onSearchChange() {
    this.remainingreceipt =
      Number(this.totalreciept) - this.ExportRecieptForm.controls['paid'].value;
  }
}
