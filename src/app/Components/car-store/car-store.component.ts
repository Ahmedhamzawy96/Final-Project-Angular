import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-store',
  templateUrl: './car-store.component.html',
  styleUrls: ['./car-store.component.css']
})
export class CarStoreComponent implements OnInit {
product:string[];
  constructor() {
    this.product=["حنفيه","كوع","مسوره نص بوصه"]
   }

  ngOnInit(): void {
  }

}
