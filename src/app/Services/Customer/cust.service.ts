import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class CustService {
  constructor(private Serv: GenericService) {}

  //Get customers
  getCustomers(): Observable<ICustomer[]> {
    return this.Serv.getAll('customer');
  }

  // Get customer By ID
  getCustomerByID(id: number): Observable<ICustomer> {
    return this.Serv.getOne('customer', id);
  }
  //Add customer
  addCustomer(newcustomer: ICustomer): Observable<ICustomer> {
    return this.Serv.Post('customer', newcustomer);
  }
  //Update customer
  updateCustomer(id: number, upcustomer: ICustomer): Observable<ICustomer> {
    return this.Serv.put('customer', id, upcustomer);
  }
  //Delete customer
  deleteCustomer(id: number): Observable<ICustomer> {
    return this.Serv.Delete('customer', id);
  }
}
