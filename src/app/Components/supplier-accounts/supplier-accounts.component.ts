import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { transition } from '@angular/animations';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';
import Swal from 'sweetalert2';

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
  transact: boolean = false;

  constructor(
    private _suppserve: SupplierService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.suppaccountsform = fbBuild.group({
      accountID: [this.suppID, [Validators.required]],
      accountType: [AccountType.Supplier],
      paid: [
        '',
        [Validators.required, Validators.pattern('((d+)+(.d+))|([0-9])$')],
      ],
      remaining: ['0'],
      type: [''],
      operationID: [1],
      operation: [''],
      date: [this.BillDate],
      userName: [JSON.parse(localStorage.getItem('UserName'))],
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
    this.transact = true;
    this.suppaccountsform.controls['type'].setValue(TransType.Paid);
    this.suppaccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    if (this.suppaccountsform.controls['paid'].value > this.Remaiing) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون قيمة المبلغ المدفوع اقل من او يساوي قيمة المبلغ المتبقي ',
      });
    } else {
      if (this.suppaccountsform.valid) {
        this.transService
          .addtransaction(this.suppaccountsform.value)
          .subscribe(() => {
            this.getRemainig();
            this.supp.account =
              Number(this.supp.account) -
              Number(this.suppaccountsform.controls['paid'].value);
            this._suppserve
              .updateSupplier(this.suppID, this.supp)
              .subscribe(() => {
                this.Remaiing = 0;
              });
            this.suppaccountsform.controls['accountID'].reset();
            this.suppaccountsform.controls['paid'].reset();
            this.suppaccountsform.controls['notes'].reset();
            this.transact = false;
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'تم الدفع بنجاح',
            });
          });
      }
    }
  }
  Get() {
    console.log(this.suppaccountsform.value);
    this.transact = true;
    this.suppaccountsform.controls['type'].setValue(TransType.Get);
    this.suppaccountsform.controls['operation'].setValue(
      Operation.SuppplierTrans
    );
    if (this.suppaccountsform.valid) {
      this.transService
        .addtransaction(this.suppaccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.supp.account =
            Number(this.supp.account) +
            Number(this.suppaccountsform.controls['paid'].value);
          this._suppserve
            .updateSupplier(this.suppID, this.supp)
            .subscribe(() => {
              this.Remaiing = 0;
            });
          this.suppaccountsform.controls['accountID'].reset();
          this.suppaccountsform.controls['paid'].reset();
          this.suppaccountsform.controls['notes'].reset();
          this.transact = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم التوريد بنجاح',
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
