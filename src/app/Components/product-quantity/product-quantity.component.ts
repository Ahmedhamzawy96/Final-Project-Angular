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
  Ischecked:boolean
  constructor(private ProdServ:ProductService) { }

  GetProducts():void {
    this.ProdServ.getProductByQuantity(this.Quantity).subscribe((Data) => {
      this.Products = Data;
this.Products.forEach(w=>{
  w.printable=false
})    
console.log(this.Products)
});
  }  
  ngOnInit(): void {
  }
  Selectall()
  {

      this.Products.forEach(w=>w.printable=this.Ischecked)

  }
  print()
  {
    this.Products= this.Products.filter(w=>w.printable==true);
    console.log(this.Products)

    this.ProdServ.printproductquntity(this.Products).subscribe(data => {
      const x = `data:application/pdf;base64,${data}`;
      var link = document.createElement('a');
    link.href = x;
    link.download = ` النواقص اقل من  - ${this.Quantity}.pdf`;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });

  }

}
