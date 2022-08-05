import { Component, OnInit } from '@angular/core';
import { CarProductService } from 'src/app/Services/CarProduct/car-product.service';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';

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
  constructor(private expre: CarProductService) {
    this.Products =["لي سخان","حنافية","فلتر امريكي","بلونه فاما "]
    this.client=["محمود","احمد","محمد","يوسف"]
   }

  ngOnInit(): void {
    this.expre.getProducts().subscribe(data =>{
      console.log(data)
    } )
  }
}
