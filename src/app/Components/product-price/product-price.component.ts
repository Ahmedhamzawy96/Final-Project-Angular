import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {

  constructor(    private ProdServ: ProductService) { }
  Products:IProduct[]
  prodID:number
  prodbuyingPrice:number
  prodSellingPrice:number
  productName:string
  ngOnInit(): void {
    this.ProdServ.getProducts().subscribe(data =>{
      this.Products=data;
    })
  }

  getProduct()
  {
    var Data=this.Products.find(x=>x.id==this.prodID)
      this.prodbuyingPrice = Data.buyingPrice;
      this.prodSellingPrice = Data.sellingPrice;
      this.productName = Data.name;
  }

}
