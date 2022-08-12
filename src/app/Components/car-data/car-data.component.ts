import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Interface/ICar';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { CarService } from 'src/app/Services/Car/car.service';
import { ExportProductService } from 'src/app/Services/ExportProduct/export-product.service';
import{ FormGroup,FormControl,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})


export class CarDataComponent implements OnInit {
 car:IExportProduct[];

 //1
 carsdata : ICar[];

 cardataform :FormGroup ;


  constructor(private src:ExportProductService,private carserv :CarService,private route:ActivatedRoute)
   { 

   this.cardataform = new FormGroup({
    
      id:new FormControl({value:'',disabled:true}),
      name:new FormControl('',[Validators.required]),
      account:new FormControl('',[Validators.required]),
      notes:new FormControl('',[Validators.required]),
      
    });

    console.log(this.cardata);

    this.ngOnInit();
  }

  ngOnInit(): void { 
     
    //2
    this.carserv.getCar().subscribe(Date=>{this.carsdata = Date; console.log(this.carsdata);console.log(Date)} )
  }
//
  delete (carsdata:ICar[]){}
//
 
  cardata(){
if (this.cardataform.valid){
  this.carserv.addCar(this.cardataform.value).subscribe(data=>{    this.carserv.getCar().subscribe(Date=>{this.carsdata = Date; console.log(this.carsdata);console.log(Date)} )
})

}
  } 
  viwe(){
    console.log (this.cardataform.value)
  }

  
}
