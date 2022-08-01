import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiptforstore',
  templateUrl: './receiptforstore.component.html',
  styleUrls: ['./receiptforstore.component.css']
})
export class ReceiptforstoreComponent implements OnInit {
  Products:string [];
  client:string [];
  BillDate:Date = new Date();
  UserName:string = "محمود سيد";
  constructor() {
    this.Products =["لي سخان","حنافية","فلتر امريكي","بلونه فاما "]
    this.client=["محمود","احمد","محمد","يوسف"]
   }

  ngOnInit(): void {
  }

}
