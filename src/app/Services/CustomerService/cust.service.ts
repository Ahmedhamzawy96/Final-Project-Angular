import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustService {

  ApiUrl:string;

  constructor(private Http:HttpClient  ) { 
    this.ApiUrl = "http://localhost:5187/api/Customer";
  }

  getCustomers():Observable<ICustomer[]> {
    return this.Http.get<ICustomer[]>(this.ApiUrl);
  }
  getcustomer(CustID: number):Observable<ICustomer> {
    return this.Http.get<ICustomer>(this.ApiUrl + "/"+CustID);
  }
}
