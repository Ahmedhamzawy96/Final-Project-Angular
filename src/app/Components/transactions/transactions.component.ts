import { TransType } from './../../Interface/Enums/TransType';
import { Operation } from './../../Interface/Enums/operation';
import { AccountType } from './../../Interface/Enums/account-type';
import { ExpendsService } from 'src/app/Services/Expends/expends.service';
import { IExpenses } from 'src/app/Interface/IExpenses';
import { ITransactions } from 'src/app/Interface/ITransactions';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TransactionsService } from 'src/app/Services/transactions.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  expenses: IExpenses[];
  nameSupp: string;
  suppaccountsform: FormGroup;
  expandID: number;
  selectex: IExpenses;
  trans: ITransactions[];
  transaction: ITransactions;
  transsupp: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();
  transact: boolean = false;

  constructor(
    private _expanserve: ExpendsService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.suppaccountsform = fbBuild.group({
      accountID: [this.expandID, [Validators.required]],
      accountType: [AccountType.Treasure],
      paid: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
      remaining: [''],
      type: [''],
      operationID: [0],
      operation: [''],
      date: [this.BillDate],
      userName: [JSON.parse(localStorage.getItem('UserName'))],
      notes: [''],
    });
  }

  Paid() {
    this.transact = true;
    this.suppaccountsform.controls['type'].setValue(TransType.Paid);
    this.suppaccountsform.controls['operation'].setValue(Operation.Expense);
    if (this.suppaccountsform.valid) {
      this.transService
        .addtransaction(this.suppaccountsform.value)
        .subscribe(() => {
          this.suppaccountsform.controls['accountID'].reset();
          this.suppaccountsform.controls['paid'].reset();
          this.suppaccountsform.controls['notes'].reset();
          this.transact = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم الدفع بنجاح',
          });
          this.transService.gettransaction().subscribe((Data) => {
            this.trans = Data;
          });
        });
    }
  }
  Get() {
    this.transact = true;
    this.suppaccountsform.controls['type'].setValue(TransType.Get);
    this.suppaccountsform.controls['operation'].setValue(Operation.Expense);
    if (this.suppaccountsform.valid) {
      this.transService
        .addtransaction(this.suppaccountsform.value)
        .subscribe(() => {
          this.suppaccountsform.controls['accountID'].reset();
          this.suppaccountsform.controls['paid'].reset();
          this.suppaccountsform.controls['notes'].reset();
          this.transact = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم التوريد بنجاح',
          });
          this.transService.gettransaction().subscribe((Data) => {
            this.trans = Data;
          });
        });
    }
  }
  ngOnInit(): void {
    this._expanserve.getExpends().subscribe((Data) => {
      this.expenses = Data;
    });
    this.transService.gettransaction().subscribe((Data) => {
      this.trans = Data;
    });
  }
}
