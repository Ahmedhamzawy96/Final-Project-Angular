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

  Products: IProduct[];
  Customers: ICustomer[];
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
      paid: new FormControl('', [Validators.required]),
      remaining: new FormControl(''),
      customerID: new FormControl('', [Validators.required]),
      customerName: new FormControl(''),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
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
    this.ProductsAdded.push({
      productName: this.Selectedproduct.name,
      productPrice: this.prdPrice,
      quantity: this.prdQuantity,
      totalPrice: this.prdPrice * this.prdQuantity,
      productID: this.Selectedproduct.id,
    });
    this.totalReciept();
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
    let pro = this.ProductsAdded.find((prod) => prod.productID == id);
    pro.quantity = quantity;
    pro.productPrice = quantity;

    pro.totalPrice = price * quantity;
    this.totalReciept();
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
    }
    if (this.ProductsAdded.length > 0 && this.ExportRecieptForm.valid) {
      receipt.products = this.ProductsAdded;
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
  }
  onSearchChange() {
    this.remainingreceipt =
      Number(this.totalreciept) - this.ExportRecieptForm.controls['paid'].value;
  }
}
