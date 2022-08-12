import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-supplier-accounts',
  templateUrl: './supplier-accounts.component.html',
  styleUrls: ['./supplier-accounts.component.css']
})
export class SupplierAccountsComponent implements OnInit {
  splyy: ISupplier[];
  nameSupp: string;
  suppaccountsform: FormGroup;
  suppID: number = 0;
  supp: ISupplier;
  trans: ITransactions[];
  transaction: ITransactions;
  transsupp: ITransactions[] = [];
  BillDate: string = new Date().toUTCString();


  constructor(private _suppserve: SupplierService, private transService: TransactionsService, private fbBuild: FormBuilder)
   {
    this.suppaccountsform = fbBuild.group({
      name: [''],
      total: [''],
      remaining: [''],
      date: [(this.BillDate)],

  })
}
  ngOnInit(): void {
    this._suppserve.getSupplier().subscribe(data => {
      this.splyy = data;
    })
    // this.transService.gettransactions().subscribe(data => {
    //   this.transaction = data;
    // })
  }

}
