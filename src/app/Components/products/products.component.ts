import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  product: IProduct;
  Addprodform: FormGroup;
  productID: number;
  newproduct = [];
  added: boolean = false;
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.Addprodform = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      buyingPrice: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
      sellingPrice: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,}')],
      ],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
    });
  }

  ngOnInit(): void {
    this.getproducts();
  }

  //get  products

  getproducts() {
    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.products = data;
    });
  }
  //Add product

  Addproduct() {
    this.added = true;
    if (
      Number(this.Addprodform.controls['buyingPrice'].value) >=
        Number(this.Addprodform.controls['sellingPrice'].value) &&
      Number(this.Addprodform.controls['buyingPrice'].value) != 0 &&
      Number(this.Addprodform.controls['sellingPrice'].value) != 0
    ) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان يكون سعر البيع اكبر من سعر الشراء  ',
      });
    } else {
      if (this.Addprodform.valid) {
        this.productService.addProduct(this.Addprodform.value).subscribe(() => {
          this.Addprodform.reset();
          this.added = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم الاضافة بنجاح',
          });
          this.productService.getProducts().subscribe((data: IProduct[]) => {
            this.products = data;
          });
        });
        this.newproduct.push(this.Addprodform.value);
      }
    }
  }

  //delete product
  deleteproduct(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'حذف  الصنف ',
        text: 'هل انت متاكد من حذفه هذا الصنف ',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',

        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(this.productID);
          this.productService.deleteProduct(id).subscribe((res) => {
            this.products = this.products.filter((item) => item.id !== id);
            console.log(' deleted successfully!');
          });
          this.products.pop();
          swalWithBootstrapButtons.fire('تم الحذف', 'تم حذف الصنف ', 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف الصنف ', 'error');
        }
      });
  }
  //update product
  updateproduct(
    id: Number,
    name: string,
    buyingPrice: number,
    sellingPrice: number,
    quantity: number
  ) {
    let upproduct = this.products.find((upproductt) => upproductt.id == id);
    upproduct.name = name;
    upproduct.buyingPrice = buyingPrice;
    upproduct.sellingPrice = sellingPrice;
    upproduct.quantity = quantity;
    this.productService
      .updateProduct(<number>upproduct.id, upproduct)
      .subscribe();
  }
}
