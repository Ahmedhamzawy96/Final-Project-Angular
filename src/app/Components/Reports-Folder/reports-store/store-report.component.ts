import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-store-report',
  templateUrl: './store-report.component.html',
  styleUrls: ['./store-report.component.css']
})
export class StoreReportComponent implements OnInit {
  products: IProduct[];
  prodTotalSell:number = 0;
  prodTotalBuy:number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(Data => {
      this.products = Data;
      Data.forEach(element => {
        this.prodTotalBuy += (element.buyingPrice * element.quantity);
        this.prodTotalSell += (element.sellingPrice * element.quantity);
      });
    })
  }

  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
