import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICar } from 'src/app/Models/ICar';
import { ICarProduct } from 'src/app/Models/ICarProduct';
import { CarService } from 'src/app/Services/Car/car.service';
import { CarProductService } from 'src/app/Services/CarProduct/car-product.service';


@Component({
  selector: 'app-car-store',
  templateUrl: './car-store.component.html',
  styleUrls: ['./car-store.component.css']
})
export class CarStoreComponent implements OnInit {
  carProduct:ICarProduct[];
  Cars: ICar[] = [];
  carID:number;
  CarCtrl: FormControl = new FormControl();
  constructor(private CarServ: CarService, private CarProdServ : CarProductService) {
    this.CarServ.getCar().subscribe(Data => {
      this.Cars = Data
    });
    console.log(this.carID);
  }

  getcarProd(carid:number) {
    this.CarProdServ.getProducts(carid).subscribe(Data => {
      this.carProduct = Data
    });
  }
  
  ngOnInit(): void{
    this.CarServ.getCar().subscribe(Data => {
      this.Cars = Data
    });
      
  }
}
