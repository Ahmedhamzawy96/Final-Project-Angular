import { Injectable } from '@angular/core';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../GenericService/generic.service';


@Injectable({
  providedIn: 'root'
})
export class CustService {
  constructor(private Serv:GenericService) { 
  }

//Get customers 
getReciepts():Observable<ICustomer[]> {
  return this.Serv.getAll("customer");
}

// Get customer By ID 
getRecieptsByID(id:number):Observable<ICustomer> {
  return this.Serv.getOne("customer",id);
}
//Add customer 
addReciept(newcustomer:ICustomer): Observable<ICustomer>{
  return this.Serv.Post("customer",newcustomer);
}
//Update customer 
updateReciept(id:number,upcustomer:ICustomer):Observable<ICustomer>{
  return this.Serv.put("customer",id,upcustomer);
}
//Delete customer 
deleteReceipt(id:number):Observable<ICustomer> {
  return this.Serv.Delete("customer",id);
}

  
}
