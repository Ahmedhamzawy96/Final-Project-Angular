import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICar } from 'src/app/Interface/ICar';
import { ICarProduct } from 'src/app/Interface/ICarProduct';
import { IUsers } from 'src/app/Interface/IUsers';
import { CarService } from 'src/app/Services/Car/car.service';
import { CarProductService } from 'src/app/Services/CarProduct/car-product.service';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-car-store',
  templateUrl: './car-store.component.html',
  styleUrls: ['./car-store.component.css'],
})
export class CarStoreComponent implements OnInit {
  carProduct: ICarProduct[];
  User: IUsers;
  Type: number;
  Cars: ICar[] = [];
  CarName: string;
  carID: number;
  CarCtrl: FormControl = new FormControl();
  TotalSellPrice:number=0;
  TotalPaidPrice:number=0;
  usertype:any
  constructor(
    private CarServ: CarService,
    private CarProdServ: CarProductService,
    private UserServ: UsersService
  ) {
    this.Type = JSON.parse(localStorage.getItem('Type'));
  }

  getcarProd(carid: number) {
    this.CarProdServ.getProducts(carid).subscribe((Data) => {
      this.carProduct = Data;
      this.carProduct.forEach(element => {
        this.TotalSellPrice+=element.sellingPrice
        this.TotalPaidPrice+=element.buyingPrice
      });
     
      console.log(this.carProduct)
      console.log(this.TotalSellPrice)
      console.log(this.TotalPaidPrice)

    });
  }
  ngOnInit(): void {
    this.usertype=JSON.parse(localStorage.getItem('Type'))
    console.log(this.usertype)
    if(JSON.parse(localStorage.getItem('Type')) == 2) {
      this.UserServ.getUsersByID(
        JSON.parse(localStorage.getItem('UserName'))
      ).subscribe((Date) => {
        this.User = Date;
        this.CarServ.getCarByID(this.User.carID).subscribe((Data) => {
          this.CarName = Data.name;
          this.CarProdServ.getProducts(this.User.carID).subscribe((Data) => {
            this.carProduct = Data;
          });
        });
      });
    } else {
      this.CarServ.getCar().subscribe((Data) => {
        this.Cars = Data;
      });
    }
  }
}
