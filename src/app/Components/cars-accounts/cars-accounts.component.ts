import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Interface/ICar';
import { CarService } from 'src/app/Services/Car/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITransactions } from 'src/app/Interface/ITransactions';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { AccountType } from 'src/app/Interface/Enums/account-type';
import { TransType } from 'src/app/Interface/Enums/TransType';
import { Operation } from 'src/app/Interface/Enums/operation';
import Swal from 'sweetalert2';

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
  transact: boolean = false;

  constructor(
    private carServ: CarService,
    private transService: TransactionsService,
    private fbBuild: FormBuilder
  ) {
    this.caraccountsform = fbBuild.group({
      accountID: [this.carID, [Validators.required]],
      accountType: [AccountType.Car],
      paid: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
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
    this.transact = true;
    this.caraccountsform.controls['type'].setValue(TransType.Paid);
    this.caraccountsform.controls['operation'].setValue(Operation.CarTrans);
    if (this.caraccountsform.controls['paid'].value > this.Remaiing) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب ان تكون قيمة المبلغ المدفوع اقل من او يساوي قيمة المبلغ المتبقي ',
      });
    } else {
      if (this.caraccountsform.valid) {
        this.transService
          .addtransaction(this.caraccountsform.value)
          .subscribe(() => {
            this.getRemainig();
            this.car.account =
<<<<<<< HEAD
<<<<<<< Updated upstream
              <number>this.car.account -
              this.caraccountsform.controls['amount'].value;
=======
              Number(this.car.account) +
              Number(this.caraccountsform.controls['paid'].value);
>>>>>>> Stashed changes
=======
              Number(this.car.account) -
              Number(this.caraccountsform.controls['paid'].value);
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
            this.carServ.updateCar(this.carID, this.car).subscribe(() => {
              this.Remaiing = 0;
            });
            this.caraccountsform.controls['accountID'].reset();
            this.caraccountsform.controls['paid'].reset();
            this.caraccountsform.controls['notes'].reset();
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
    this.transact = true;
    this.caraccountsform.controls['type'].setValue(TransType.Get);
    this.caraccountsform.controls['operation'].setValue(Operation.CarTrans);
    if (this.caraccountsform.valid) {
      this.transService
        .addtransaction(this.caraccountsform.value)
        .subscribe(() => {
          this.getRemainig();
          this.car.account =
<<<<<<< HEAD
<<<<<<< Updated upstream
            <number>this.car.account +
            this.caraccountsform.controls['amount'].value;
=======
            Number(this.car.account) -
            Number(this.caraccountsform.controls['paid'].value);
>>>>>>> Stashed changes
=======
            Number(this.car.account) +
            Number(this.caraccountsform.controls['paid'].value);
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
          this.carServ.updateCar(this.carID, this.car).subscribe((Data) => {
            this.Remaiing = Data.account;
          });
          this.caraccountsform.controls['accountID'].reset();
          this.caraccountsform.controls['paid'].reset();
          this.caraccountsform.controls['notes'].reset();
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
    this.carServ.getCar().subscribe((data) => {
      this.Cars = data;
    });
  }
}
