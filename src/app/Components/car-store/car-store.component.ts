import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICar } from 'src/app/Interface/ICar';
import { ICarProduct } from 'src/app/Interface/ICarProduct';
import { IUsers } from 'src/app/Interface/IUsers';
import { CarService } from 'src/app/Services/Car/car.service';
import { CarProductService } from 'src/app/Services/CarProduct/car-product.service';
import { UsersService } from 'src/app/Services/Users/users.service';
import Swal from 'sweetalert2';

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
    private UserServ: UsersService,
    private Route: Router,
  ) {
    this.Type = JSON.parse(localStorage.getItem('Type'));
  }

  getcarProd(carid: number) {
    this.carID = carid;
    this.TotalSellPrice=0;
    this.TotalPaidPrice=0;
    this.CarProdServ.getProducts(carid).subscribe((Data) => {
      this.carProduct = Data;
      this.carProduct.forEach(element => {
        this.TotalSellPrice=this.TotalSellPrice+(element.sellingPrice*Number(element.quantity))
        this.TotalPaidPrice+=(element.buyingPrice*Number(element.quantity))
      });
      this.TotalSellPrice=  parseFloat(this.TotalSellPrice.toFixed(2));
      this.TotalPaidPrice=  parseFloat(this.TotalPaidPrice.toFixed(2));



    });
  }

  Delete(id:number ,row:HTMLElement):void {
    debugger;
    Swal.fire({
      title: 'هل انت متاكد من حذف المنتج?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'الغاء'

    }).then((result) => {
      if (result.isConfirmed) {
        this.CarProdServ.deleteCarProduct(id,JSON.parse(localStorage.getItem('Type')) == 2 ? this.User.carID : this.carID ).subscribe(data => {
          debugger;
          Swal.fire(
            'تم الحذف!',
            'تم حذف الملف بنجاح.',
            'success'
          )
          row.parentElement.parentElement.remove();
          //window.location.reload();
        });

      }
    })




      // this.CarProdServ.deleteCarProduct(id,JSON.parse(localStorage.getItem('Type')) == 2 ? this.User.carID : this.carID ).subscribe(data => {
      //   this.Route.navigate(['car-store']);
      // });
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
        this.carID = Data[0].id;
        this.getcarProd(this.carID);
      });
    }
  }
}
