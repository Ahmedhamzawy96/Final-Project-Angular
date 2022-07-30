import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:string[];
  constructor() { 
this.products=["حنفيه","جلبه نص بوصه","كوع"]
  }

  ngOnInit(): void {
  }

}
