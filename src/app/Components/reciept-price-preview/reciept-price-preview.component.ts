import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IProduct } from 'src/app/Interface/IProduct';
import { CustService } from 'src/app/Services/Customer/cust.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RecieptPrintService } from 'src/app/Services/reciept-print.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reciept-price-preview',
  templateUrl: './reciept-price-preview.component.html',
  styleUrls: ['./reciept-price-preview.component.css']
})
export class RecieptPricePreviewComponent implements OnInit {
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
    private PrintReciept: RecieptPrintService,
  ) { 
    this.ExportRecieptForm = new FormGroup({
      total: new FormControl(''),
      notes: new FormControl(''),
      date: new FormControl(this.BillDate),
      remaining: new FormControl('0'),
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
    }  else if (this.prdPrice < prod.buyingPrice || this.prdPrice == 0) {
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
        total - discPerc * total
      );
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
  OnSubmit() {
    console.log("dddd");
    this.submit = true;
    let receipt: IExportReciept = this.ExportRecieptForm.value;
    console.log(this.ProductsAdded);
    console.log(this.ExportRecieptForm.valid);

    if (this.ProductsAdded.length == 0 && this.ExportRecieptForm.valid) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان يحتوي عرض السعر علي صنف واحد علي الاقل ',
      });
    }  else if (
      this.ProductsAdded.length > 0 &&
      this.ExportRecieptForm.valid &&
      !this.tableNotValid
    ) {
      receipt.products = this.ProductsAdded;
      console.log(receipt);
      debugger;
      this.PrintReciept.RecieptPreview(receipt).subscribe((data) => {
        const x = `data:application/pdf;base64,${data}`;
        var link = document.createElement('a');
      link.href = x;
      link.download = `عرض سعر.pdf`;
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      });
    }
  }

}
