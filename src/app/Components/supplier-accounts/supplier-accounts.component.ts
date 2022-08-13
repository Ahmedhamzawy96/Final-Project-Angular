import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { transition } from '@angular/animations';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';

@Component({
  selector: 'app-supplier-accounts',
  templateUrl: './supplier-accounts.component.html',
  styleUrls: ['./supplier-accounts.component.css'],
})
export class SupplierAccountsComponent implements OnInit {
  splyy: ISupplier[];
  nameSupp: string;
  suppaccountsform: FormGroup;
  suppID: number;
  supp: ISupplier;
  Remaiing: Number;
  trans: ITransactions[];
  transaction: ITransactions;
  transsupp: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();

  constructor(
    private _suppserve: SupplierService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.suppaccountsform = fbBuild.group({
      accountID: [this.suppID],
      accountType: [AccountType.Supplier],
      amount: [''],
      type: [''],
      operationID: [1],
      operation: [''],
      date: [this.BillDate],
      userName: ['ahmed123'],
      notes: [''],
    });
  }
  getRemainig() {
    this.supp = this.splyy.find((A) => A.id == this.suppID);
    this.Remaiing = this.supp.account;
    this.transService
      .transactionbytype(this.suppID, AccountType.Supplier)
      .subscribe((Data) => {
        this.trans = Data;
        this.trans.forEach((element) => {
          element.Name = this.supp.name;
        });
      });
  }
  Paid() {
    this.suppaccountsform.controls['type'].setValue(TransType.Paid);
    this.suppaccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    if (this.suppaccountsform.valid) {
      this.transService
        .addtransaction(this.suppaccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.supp.account =
            <number>this.supp.account -
            this.suppaccountsform.controls['amount'].value;
          this._suppserve
            .updateSupplier(this.suppID, this.supp)
            .subscribe((Data) => {
              this.Remaiing = Data.account;
            });
        });
    }
  }

  Get() {
    this.suppaccountsform.controls['type'].setValue(TransType.Get);
    this.suppaccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    console.log(this.suppaccountsform.value);
    if (this.suppaccountsform.valid) {
      this.transService
        .addtransaction(this.suppaccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.supp.account =
            <number>this.supp.account +
            this.suppaccountsform.controls['amount'].value;
          this._suppserve
            .updateSupplier(this.suppID, this.supp)
            .subscribe((Data) => {
              this.Remaiing = Data.account;
            });
        });
    }
  }
  ngOnInit(): void {
    this._suppserve.getSupplier().subscribe((data) => {
      this.splyy = data;
    });
  }
}
