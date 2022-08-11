import { Component, OnInit } from '@angular/core';
import { ITransactions } from 'src/app/interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions:ITransactions[]

  constructor(private transServ : TransactionsService) { }

  ngOnInit(): void {
    this.transServ.getReciepts().subscribe(Data => {
      this.transactions = Data
    })
  }

}
