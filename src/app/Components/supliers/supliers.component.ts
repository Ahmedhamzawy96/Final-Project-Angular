import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
supliers:string[];
  constructor() { 
    this.supliers = ["عمر" , " الحاج خالد " ,  " الاستاذ عصام",]
  }

  ngOnInit(): void {
  }

}
