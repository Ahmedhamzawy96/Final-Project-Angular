import { ISupplier } from './../../Interface/ISupplier';
import { SupplierService } from './../../Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';


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
    this._supplierservice.GetAllSuppliers().subscribe((supplier)=>{
    this.GetSupplier=supplier;
    console.log( this.GetSupplier)
    })
  }

}
