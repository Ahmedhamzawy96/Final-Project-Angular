import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { ImportReceiptService } from 'src/app/Services/Import Receipt/import-receipt.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IImportProduct } from 'src/app/Interface/IImportProduct';
import { IProduct } from 'src/app/Interface/IProduct';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { IProductPrice } from 'src/app/Interface/iproduct-price';

@Component({
  selector: 'app-import-reciept',
  templateUrl: './import-reciept.component.html',
  styleUrls: ['./import-reciept.component.css'],
})
export class ImportRecieptComponent implements OnInit {
  BillDate: string = new Date().toLocaleString();
  UserName: string;
  prodID: number;
  ImportProducts: IImportProduct[] = [];
  protected Products: IProduct[] = [];
  @ViewChild('radioInput') radio: ElementRef;
  prodSellingPrice: number;
  prodbuyingPrice: number;
  Quantity: number;
  productName: string;
  remainig: number;
  paid: number;
  Disc: number;
  ImportRecieptForm: FormGroup;
  protected Suppliers: ISupplier[] = [];
  submit: boolean = false;
  tableNotValid: boolean = false;
  totalBeforeDisc: number;
  constructor(
    private SuppServ: SupplierService,
    private ProdServ: ProductService,
    private imporRecServ: ImportReceiptService,
    private Route: Router
  ) {
    // ImportReciept From
    this.ImportRecieptForm = new FormGroup({
      total: new FormControl(''),
      notes: new FormControl(''),
      date: new FormControl(this.BillDate),
      paid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
      ]),
      remaining: new FormControl(''),
      supid: new FormControl('', [Validators.required]),
      userName: new FormControl(JSON.parse(localStorage.getItem('UserName'))),
    });
  }

  ngOnInit(): void {
    this.SuppServ.getSupplier().subscribe((Data) => {
      this.Suppliers = Data;
    });
    this.ProdServ.getProducts().subscribe((Data) => {
      this.Products = Data;
    });
  }
  deleteProd() {
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
          debugger;
          let prod: IImportProduct = this.ImportProducts.find(
            (pro) => pro.productID == this.prodID
          );
          let index: number = this.ImportProducts.indexOf(prod);
          this.ImportProducts.splice(index, 1);
          this.totalReciept();
          this.getRemain();
          swalWithBootstrapButtons.fire('تم الحذف', 'تم حذف المنتج', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف المنتج', 'error');
        }
      });
    //#endregion
  }

  change(id: number, value: number) {
    this.tableNotValid = true;
    let pro = this.ImportProducts.find((prod) => prod.productID == id);
    if (value == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون الكمية اكبر من الصفر',
      });
    } else {
      pro.quantity = value;
      pro.totalPrice = pro.buyingPrice * value;
      this.totalReciept();
      this.tableNotValid = false;
    }
  }
  totalReciept() {
    let total: number = 0;
    for (let item of this.ImportProducts) {
      total += item.totalPrice;
    }
    this.ImportRecieptForm.controls['total'].setValue(total);
    this.totalBeforeDisc = total;
  }

  getRemain() {
    this.ImportRecieptForm.controls['remaining'].setValue(
      this.ImportRecieptForm.controls['total'].value -
        this.ImportRecieptForm.controls['paid'].value
    );
  }

  addProduct(id: number) {
    let prod = this.Products.find((A) => A.id == id);
    if (this.Quantity == 0) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون الكمية اكبر من الصفر',
      });
    } else if (this.ImportProducts.find((A) => A.productID == prod.id)) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'تم اضافة الصنف من قبل ',
      });
    } else {
      debugger;
      if(this.prodbuyingPrice != prod.sellingPrice || this.prodbuyingPrice != prod.buyingPrice) {
        let updatedPrice:IProductPrice = {buyingPrice: this.prodbuyingPrice ,sellingPrice : this.prodSellingPrice}; 
        this.ProdServ.UpdateProductPrice(id,updatedPrice).subscribe();
      }
      this.ImportProducts.push({
        productID: id,
        productName: this.productName,
        quantity: this.Quantity,
        buyingPrice: this.prodbuyingPrice,
        totalPrice: this.prodbuyingPrice * this.Quantity,
      });
      this.totalReciept();
    }
    this.Quantity = null;
  }

  getProduct(id: number) {
    var Data=this.Products.find(x=>x.id==id)
    // this.ProdServ.getProductsByID(id).subscribe((Data) => {
      this.prodbuyingPrice = Data.buyingPrice;
      this.prodSellingPrice = Data.sellingPrice;
      this.productName = Data.name;
    // });
  }
  discount(values: any) {
    let disc = Number(values);
    if (disc == 0) {
      this.totalReciept();
    } else {
      let total = this.ImportRecieptForm.controls['total'].value;
      this.ImportRecieptForm.controls['total'].setValue(total - disc);
    }

    this.getRemain();
  }
  Submit() {
    this.submit = true;
    let reciept: IImportReciept = this.ImportRecieptForm.value;
    reciept.importProducts = this.ImportProducts;
    if (this.ImportProducts.length == 0 && this.ImportRecieptForm.valid) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تحتوي الفاتورة علي صنف واحد علي الاقل ',
      });
    // } else if (
    //   this.ImportRecieptForm.controls['total'].value <
    //   this.ImportRecieptForm.controls['paid'].value
    // ) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '',
    //     text: 'يجب ان يكون المبلغ المدفوع اقل من او يساوي اجمالي الفاتورة ',
    //   });
    } else if (
      this.ImportProducts.length > 0 &&
      this.ImportRecieptForm.valid &&
      !this.tableNotValid
    ) {
      this.imporRecServ.addReciept(reciept).subscribe((Data) => {
        this.ImportRecieptForm.reset();
        this.submit = true;
        this.Route.navigate(['ImportRecieptPrint', Data.id]);
      });
    }
  }
}
