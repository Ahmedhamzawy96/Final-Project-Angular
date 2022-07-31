import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiptforcar',
  templateUrl: './receiptforcar.component.html',
  styleUrls: ['./receiptforcar.component.css']
})
export class ReceiptforcarComponent implements OnInit {
  Products: string [];
  client:string [];
  constructor() {
    this.Products =["لي سخان","حنافية","فلتر امريكي","بلونه فاما "]
    this.client=["محمود","احمد","محمد","يوسف"]
   }

  ngOnInit(): void {
  }

}
