import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:IProduct[];
product: IProduct;
Addprodform: FormGroup;
productID: number;
newproduct = []
  constructor( private productService : ProductService  , private fb : FormBuilder) { 

    this.Addprodform = fb.group({
      name: [''],
      buyingPrice: [''],
      sellingPrice: [''],
      quantity: [''],

    })
  }

  ngOnInit(): void {
    this.getproducts()
  }

  
  //get  products

  getproducts() {

    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.products = data;
      console.log(this.products)

    })

  }
  //Add product

  Addproduct() {
    console.log(this.Addprodform.value);
    this.productService.addProduct(this.Addprodform.value).subscribe((res) => {
      console.log(res);
      this.productService.getProducts().subscribe((data: IProduct[]) => {
        this.products = data;
        console.log(this.products)
  
      })
      
      console.log(' created successfully!');
      
    })
    this.newproduct.push(this.Addprodform.value);
  }

//delete product
  deleteproduct(id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'حذف  العميل ',
      text: 'هل انت متاكد من حذفه هذا العميل ',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'لا',
  
      confirmButtonText: 'نعم',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.productID);
        this.productService.deleteProduct(id).subscribe(res => {
          this.products = this.products.filter(item => item.id !== id);
          console.log(' deleted successfully!');
        })
        this.products.pop();
     swalWithBootstrapButtons.fire(
        'تم الحذف',
        'تم حذف العميل ',
        'success'
      )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'الغاء',
          'لم يتم حذف العميل ',
          'error'
        )
      }
    }) 

  }
//update product
  updateproduct(id:Number,name:string,buyingPrice:number,sellingPrice :number , quantity:number){

    let upproduct = this.products.find(upproductt => upproduct.id == id);
    upproduct.name = name;
    upproduct.buyingPrice = buyingPrice;
    upproduct.sellingPrice = sellingPrice;
    upproduct.quantity = quantity;

      this.updateproduct
 }


}



