import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 custmer:string[];
  constructor() {
    this.custmer = ["عمر" , " الحاج خالد " ,  " الاستاذ عصام",]
   }

  ngOnInit(): void {
  }

}
