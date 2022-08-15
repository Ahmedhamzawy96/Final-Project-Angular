import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.Addprodform = fb.group({
      name: [''],
      buyingPrice: [''],
      sellingPrice: [''],
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.getproducts();
  }

  //get  products

  getproducts() {
    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.products = data;
      console.log(this.products);
    });
  }
  //Add product

  Addproduct() {
    this.productService.addProduct(this.Addprodform.value).subscribe(() => {
      this.Addprodform.reset();
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
