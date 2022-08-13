import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic.service';
import { Observable } from 'rxjs';
import { IExpenses } from 'src/app/Interface/IExpenses';
@Injectable({
  providedIn: 'root'
})
export class ExpendsService {


  constructor(private expend:GenericService) { }

  //Get Expends
   getExpends():Observable<IExpenses[]>{
    return this.expend.getAll("Expenses");
  }
  // Get Expends By ID
  getExpendsByID(id:number):Observable<IExpenses> {
    return this.expend.getOne("Expenses",id);
  }

  //Add Expends
  addExpends(expens:IExpenses): Observable<IExpenses>{
    return this.expend.Post("Expenses",expens);
  }

  //Update Expends
  updateExpends(id:number,expens:IExpenses):Observable<IExpenses>{
    return this.expend.put("Expenses",id,expens);
  }
 //Delete Expends
 deleteExpends(id:number):Observable<IExpenses> {
  return this.expend.Delete("Expenses",id);
}

}
