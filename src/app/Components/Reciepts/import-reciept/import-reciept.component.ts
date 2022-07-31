import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-reciept',
  templateUrl: './import-reciept.component.html',
  styleUrls: ['./import-reciept.component.css']
})
export class ImportRecieptComponent implements OnInit {
  BillDate:Date = new Date()
  UserName:string = "محمود سيد";
  Suppliers: string [];
  Products: string [];
  constructor() { 
    this.Suppliers = ["الحج محمد" ," الشركة العربي" ," الايطالية" , " الفرنسية"]
    this.Products = ["حنفية 7 بوصه " , " لي سخان " ,  " كابينة شاور ",]
  }

  ngOnInit(): void {
  }

}
