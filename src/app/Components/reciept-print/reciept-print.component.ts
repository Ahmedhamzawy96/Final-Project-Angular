import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reciept-print',
  templateUrl: './reciept-print.component.html',
  styleUrls: ['./reciept-print.component.css']
})
export class RecieptPrintComponent implements OnInit {
  BillDate:Date = new Date()
  recieptNumber:number = 1234552;
  UserName:string = "محمود سيد";
  Customer:string="الحج محمد"
  Products: string [];
  constructor() {
    this.Products = ["حنفية 7 بوصه " , " لي سخان " ,  " كابينة شاور ",]
   }
   Print() {
    
   }
  ngOnInit(): void {
  }

}
