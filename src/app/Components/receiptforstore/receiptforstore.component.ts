import { IExportReciept } from './../../Interface/IExportReciept';
import { ExportProductService } from './../../Services/ExportProduct/export-product.service';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { ProductService } from './../../Services/Product/product.service';
import { IProduct } from 'src/app/Interface/IProduct';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { CustService } from 'src/app/Services/Customer/cust.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receiptforstore',
  templateUrl: './receiptforstore.component.html',
  styleUrls: ['./receiptforstore.component.css'],
})
export class ReceiptforstoreComponent implements OnInit {
  ExportRecieptForm: FormGroup;
  Products: IProduct[] = [];
  Customers: ICustomer[] = [];
  ProductsAdded: IExportProduct[] = [];
  selectedid: number;
  PrdID: number = 0;
  Selectedproduct: IProduct;
  BillDate: string = new Date().toLocaleString();
  prdQuantity: number;
  prdPrice: number;
  totalreciept: number;
  paidreceipt: string = 'ASD';
  remainingreceipt: number;
  submit: boolean = false;
  tableNotValid: boolean = false;
  Disc: number;
  totalBeforeDisc: number;
  CustomerAccount:number =0;
  CustID:number;
  UserName:string = JSON.parse(localStorage.getItem('UserName'));
  remainingValue:number =0;
  constructor(
    private custServ: CustService,
    private Productserv: ProductService,
    private Exportserv: ExportRecieptService,
    private expProd: ExportProductService,
    private Route: Router
  ) {
    this.ExportRecieptForm = new FormGroup({
      total: new FormControl(''),
      notes: new FormControl(''),
      date: new FormControl(this.BillDate),
      paid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
      ]),
      remaining: new FormControl('0'),
      customerID: new FormControl('', [Validators.required]),
      customerName: new FormControl(''),
      currentAccount:new FormControl(''),
      previousAccount:new FormControl(''),
      userName: new FormControl(this.UserName),
    });
  }
  ngOnInit(): void {
    this.custServ.getCustomers().subscribe((data) => {
      this.Customers = data;
    });

    this.Productserv.getProducts().subscribe((data) => {
      this.Products = data;
    });
  }

  prdselect(id: number) {
    this.Selectedproduct = this.Products.find((w) => w.id == id);
    this.prdPrice = this.Selectedproduct.sellingPrice;
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
    } else if (price < mainProd.sellingPrice || price == 0) {
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
    debugger;
    this.ExportRecieptForm.controls['remaining'].setValue(
      this.ExportRecieptForm.controls['total'].value -
        this.ExportRecieptForm.controls['paid'].value
    );
  }
  discount(values: any) {
    let disc = Number(values);
    if (disc == 0) {
      this.totalReciept();
      console.log(this.ExportRecieptForm.controls['total'].value);
      console.log(disc);
    } else {
      let total = this.ExportRecieptForm.controls['total'].value;
      let discPerc = disc * 0.01;
      this.ExportRecieptForm.controls['total'].setValue(
        // total - discPerc * total
        total - disc

      );
    }

    this.getRemain();
  }
  OnSubmit() {
    this.submit = true;
    let receipt: IExportReciept = this.ExportRecieptForm.value;
    if (this.ProductsAdded.length == 0 && this.ExportRecieptForm.valid) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تحتوي الفاتورة علي صنف واحد علي الاقل ',
      });
    } else if (
      
      this.ExportRecieptForm.controls['paid'].value > (this.ExportRecieptForm.controls['total'].value + this.CustomerAccount)
    ) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان يكون المبلغ المدفوع اقل من او يساوي اجمالي حساب العميل و اجمالي الفاتورة ',
      });
    } else if (
      this.ProductsAdded.length > 0 &&
      this.ExportRecieptForm.valid &&
      !this.tableNotValid
    ) {
      receipt.products = this.ProductsAdded;
      receipt.remaining = receipt.total-receipt.paid;
      receipt.currentAccount = this.CustomerAccount + receipt.remaining;
      receipt.previousAccount = this.CustomerAccount;
      console.log(receipt);
      debugger;
      this.Exportserv.addReciept(receipt).subscribe((data) => {
        this.ExportRecieptForm.reset();
        this.submit = true;
        this.Route.navigate(['ExportRecieptPrint', data.id]);
      });
    }
  }
  totalReciept() {
    let total: number = 0;
    for (let item of this.ProductsAdded) {
      total += item.totalPrice;
    }
    this.totalreciept = total;
    this.totalBeforeDisc = total;
  }
  onSearchChange() {
    let Value = Number(this.totalreciept) - this.ExportRecieptForm.controls['paid'].value;
    this.remainingreceipt = Value;
    this.remainingValue = (Value <= 0) ? 0 : Value;
  }
  GetCustomerAccount(id:number){
    this.custServ.getCustomerByID(id).subscribe((data) => {
      this.CustomerAccount = Number(data.account);
    })
  }
}
