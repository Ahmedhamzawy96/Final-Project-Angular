import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  Quantity:Number = 0;
  Products:IProduct[] = [];
  constructor(private ProdServ:ProductService) { }

  GetProducts():void {
    this.ProdServ.getProductByQuantity(this.Quantity).subscribe((Data) => {
      this.Products = Data;
    });
  }  
  ngOnInit(): void {
  }

}
