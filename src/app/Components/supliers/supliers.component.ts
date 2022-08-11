import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/interface/ISupplier';


@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
  GetSupplier:ISupplier[];
  constructor(private _supplierservice: SupplierService ) { 
  }
  

  ngOnInit(): void {
  
    this._supplierservice.getSupplier().subscribe(Date=>{this.GetSupplier=Date
    console.log(this.GetSupplier)
  })
  }

}
