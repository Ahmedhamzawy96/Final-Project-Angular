import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/interface/ICustomer';
import { CustService } from 'src/app/Services/Customer/cust.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 custmer:ICustomer[];
  
  constructor(private csutServ:CustService) {

   }

  ngOnInit(): void {

    
  }
}
