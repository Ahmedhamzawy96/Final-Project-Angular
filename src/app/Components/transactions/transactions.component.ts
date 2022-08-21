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
<<<<<<< HEAD
<<<<<<< Updated upstream
  //@Output() TransUpdated = new EventEmitter<ITransactions[]>();

  notes: string;
  amount: number;
=======
  expenses: IExpenses[];
  nameSupp: string;
  suppaccountsform: FormGroup;
  expandID: number;
  selectex: IExpenses;
  alltrans:ITransactions[];
  trans: ITransactions[]=[];
  transsupp: ITransactions[] = [];
>>>>>>> Stashed changes
  BillDate: string = new Date().toLocaleString();
  user: string;
  receiver: string;
  receiptID: number;
  receiptType: string;

  id: number;
  transact: ITransactions[] = [];
=======
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
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
<<<<<<< HEAD
<<<<<<< Updated upstream
    private Trans: TransactionsService,
    private exServ: ExpendsService
  ) {}

  addTrans() {
    let trans: ITransactions = {
      accountID: this.id,
      accountType: AccountType.Treasure,
      amount: this.amount,
      date: this.BillDate,
      notes: this.notes,
      operation: Operation.Expense,
      type: TransType.Paid,
      userName: 'asd',
      id: 0,
      Name: '',
    };
    this.Trans.addtransaction(trans).subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'تم الاضافة بنجاح',
      });
      this.transact.push(data);
    });
  }

  // UpdateTrans() {
  //   // this.Trans.updatetransaction(this.id, this.UserTransaction.value).subscribe(
  //   //   (upd: ITransactions) => {
  //   //     this.transact.push(upd);
  //   //   }
  //   // );
  // }

  ngOnInit(): void {
    this.getdatatotable();
  }

  getdatatotable() {
    this.exServ.getExpends().subscribe((data) => {
      this.expenses = data;
    });
  }

  selectchange() {
    this.selectex = this.expenses.find((w) => w.id == this.id);
    console.log(this.selectex);

    this.Trans.transactionbytype(this.id, AccountType.Treasure).subscribe(
      (Date) => {
        this.transact = Date;
        this.transact.forEach((element) => {
          element.Name = this.selectex.name;
=======
    private _expanserve: ExpendsService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.suppaccountsform = fbBuild.group({
      accountID: [this.expandID, [Validators.required]],
      accountType: [AccountType.Treasure],
      paid: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
      remaining: ['0'],
      type: [''],
      operationID: [0],
      operation: [''],
      date: [this.BillDate],
      userName: [JSON.parse(localStorage.getItem('UserName'))],
      notes: [''],
    });
  }
  selectedExpenses() {
    this.selectex = this.expenses.find((c) => c.id ==this.expandID);
    this.transService
      .transactionbytype(<number>this.selectex.id, AccountType.Treasure)
      .subscribe((data) => {
        this.trans = data;
        console.log(data)
        this.trans.forEach((element) => {
          element.Name = this.selectex.name;
        });
      });
  }
=======
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

>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
  Paid() {
    this.transact = true;
    this.suppaccountsform.controls['type'].setValue(TransType.Paid);
    this.suppaccountsform.controls['operation'].setValue(Operation.Expense);
    if (this.suppaccountsform.valid) {
<<<<<<< HEAD
      console.log(this.suppaccountsform.value)
=======
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
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
<<<<<<< HEAD

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

>>>>>>> Stashed changes
=======
          this.transService.gettransaction().subscribe((Data) => {
            this.trans = Data;
          });
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
        });
    }
  }
<<<<<<< HEAD
<<<<<<< Updated upstream

  deleteTrans() {
    this.Trans.deletetransaction(this.id).subscribe((Date) => {
      this.getdatatotable();
=======
  ngOnInit(): void {
    this._expanserve.getExpends().subscribe((Data) => {
      this.expenses = Data;
>>>>>>> Stashed changes
=======
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
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
    });
  }
}
