import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Interface/ICar';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { CarService } from 'src/app/Services/Car/car.service';
import { ExportProductService } from 'src/app/Services/ExportProduct/export-product.service';
import{ FormGroup,FormControl,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cars-accounts',
  templateUrl: './cars-accounts.component.html',
  styleUrls: ['./cars-accounts.component.css']
})

export class CarsAccountsComponent implements OnInit {

  car:IExportProduct[];

  caraccount : ICar[];

  caraccountform :FormGroup ;

  caraccountformsc :FormGroup ;

  constructor(private src:ExportProductService,private caracountserv :CarService,private route:ActivatedRoute)
   { 
    this.caraccountform = new FormGroup({
    
      id:new FormControl({value:'',disabled:true}),
      name:new FormControl('',[Validators.required]),
      // account:new FormControl('',[Validators.required]),
      notes:new FormControl('',[Validators.required]),
      
    });

    this.caraccountformsc = new FormGroup({
    
      id:new FormControl({value:'',disabled:true}),
      notes:new FormControl('',[Validators.required]),
      
    });
   }

  ngOnInit(): void 
  {
    this.caracountserv.getCar().subscribe(Date=>{this.caraccount = Date; console.log(this.caraccount);console.log(Date)} )

  }
  
  cardata(){
    if (this.caraccountform.valid){
      this.caracountserv.addCar(this.caraccountform.value).subscribe(data=>{this.caracountserv.getCar().subscribe(Date=>{this.caraccount = Date; console.log(this.caraccount);console.log(Date)} )
    })
    
    }
      } 
      cardatasc(){
        if (this.caraccountformsc.valid){
          this.caracountserv.addCar(this.caraccountformsc.value).subscribe(data=>{this.caracountserv.getCar().subscribe(Date=>{this.caraccount = Date; console.log(this.caraccount);console.log(Date)} )
        })
        
        }
      }
}
