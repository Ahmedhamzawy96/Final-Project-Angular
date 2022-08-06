import { Injectable } from '@angular/core';
import {ITransactions  } from "../Interface/ITransactions";
import { environment } from 'src/environments/environment';
import { GenericService } from '../Services/GenericService/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private Serv:GenericService) { }

  //Get Transactions 
getReciepts():Observable<ITransactions[]> {
  return this.Serv.getAll("transactions");
}

// Get ITransaction By ID 
getRecieptsByID(id:number):Observable<ITransactions> {
  return this.Serv.getOne("transaction",id);
}
//Add customer 
addReciept(newtransaction:ITransactions): Observable<ITransactions>{
  return this.Serv.Post("transaction",newtransaction);
}
//Update customer 
updateReciept(id:number,uptransaction:ITransactions):Observable<ITransactions>{
  return this.Serv.put("customer",id,uptransaction);
}
//Delete customer 
deleteReceipt(id:number):Observable<ITransactions> {
  return this.Serv.Delete("transaction",id);
}
}
