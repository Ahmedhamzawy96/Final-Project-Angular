import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustService {
  constructor(private Http:HttpClient  ) { 
  }
  // Get Customers List
  getCustomers():Observable<ICustomer[]> {
    return this.Http.get<ICustomer[]>(`${environment.APIUrl}/customer`);
  }
  //Get Customer By ID
  getcustomer(CustID: number):Observable<ICustomer> {
    return this.Http.get<ICustomer>(`${environment.APIUrl}/customer/${CustID}`);
  }
}
