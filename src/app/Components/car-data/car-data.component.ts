import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Models/ICar';
import { IExportProduct } from 'src/app/Models/IExportProduct';
import { ExportProductService } from 'src/app/Services/ExportProduct/export-product.service';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent implements OnInit {
 car:IExportProduct[];
  constructor(private src:ExportProductService) { 
    //this.car=["dmx","nissan","ch","toyota"];
  }

  ngOnInit(): void { 
      //  this.src.getReciepts().subscribe((Date=> {
      //   this.car=Date
      //   console.log(this.car);
    // }))
    
  }

}
