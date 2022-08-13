import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';

@Component({
  selector: 'app-cars-accounts',
  templateUrl: './cars-accounts.component.html',
  styleUrls: ['./cars-accounts.component.css'],
})
export class CarsAccountsComponent implements OnInit {
  Cars: ICar[];
  nameCar: string;
  caraccountsform: FormGroup;
  carID: number;
  car: ICar;
  Remaiing: Number;
  trans: ITransactions[];
  transaction: ITransactions;
  transsupp: ITransactions[] = [];
  BillDate: string = new Date().toLocaleString();

  constructor(
    private carServ: CarService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.caraccountsform = fbBuild.group({
      accountID: [this.carID],
      accountType: [AccountType.Car],
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
    this.car = this.Cars.find((A) => A.id == this.carID);
    this.Remaiing = this.car.account;
    this.transService
      .transactionbytype(this.carID, AccountType.Car)
      .subscribe((Data) => {
        this.trans = Data;
        this.trans.forEach((element) => {
          element.Name = this.car.name;
        });
      });
  }
  Paid() {
    this.caraccountsform.controls['type'].setValue(TransType.Paid);
    this.caraccountsform.controls['operation'].setValue(Operation.CarTrans);
    if (this.caraccountsform.valid) {
      this.transService
        .addtransaction(this.caraccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.car.account =
            <number>this.car.account -
            this.caraccountsform.controls['amount'].value;
          this.carServ.updateCar(this.carID, this.car).subscribe((Data) => {
            this.Remaiing = Data.account;
          });
        });
    }
  }

  Get() {
    this.caraccountsform.controls['type'].setValue(TransType.Get);
    this.caraccountsform.controls['operation'].setValue(Operation.CarTrans);
    console.log(this.caraccountsform.value);
    if (this.caraccountsform.valid) {
      this.transService
        .addtransaction(this.caraccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.car.account =
            <number>this.car.account +
            this.caraccountsform.controls['amount'].value;
          this.carServ.updateCar(this.carID, this.car).subscribe((Data) => {
            this.Remaiing = Data.account;
          });
        });
    }
  }
  ngOnInit(): void {
    this.carServ.getCar().subscribe((data) => {
      this.Cars = data;
    });
  }
}
