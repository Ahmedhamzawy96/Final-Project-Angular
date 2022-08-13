import { Injectable } from '@angular/core';
import { ITransactions } from '../Interface/ITransactions';
import { environment } from 'src/environments/environment';
import { GenericService } from '../Services/GenericService/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private Serv: GenericService) {}

  //Get Transactions
  gettransaction(): Observable<ITransactions[]> {
    return this.Serv.getAll('transactions');
  }

  // Get ITransaction By ID
  gettransactionByID(id: number): Observable<ITransactions> {
    return this.Serv.getOne('Transactions', id);
  }
  //Add customer
  addtransaction(newtransaction: ITransactions): Observable<ITransactions> {
    return this.Serv.Post('Transactions', newtransaction);
  }
  //Update customer
  updatetransaction(
    id: number,
    uptransaction: ITransactions
  ): Observable<ITransactions> {
    return this.Serv.put('customer', id, uptransaction);
  }
  //Delete customer
  deletetransaction(id: number): Observable<ITransactions> {
    return this.Serv.Delete('Transactions', id);
  }
  // Get Transaction By ID and type
  transactionbytype(id: number, type: number): Observable<ITransactions[]> {
    return this.Serv.getTransaction('Transactions', id, type);
  }
}
