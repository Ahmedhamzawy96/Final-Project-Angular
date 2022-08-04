import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
supliers:ISupplier[]=[];
  constructor() { 
  }

  ngOnInit(): void {
  }

}
