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
    return this.expend.getAll("Expends");
  }

  // Get Expends By ID
  getExpendsByID(id:number):Observable<IExpenses> {
    return this.expend.getOne("Expends",id);
  }

  //Add Expends
  addExpends(expens:IExpenses): Observable<IExpenses>{
    return this.expend.Post("Expends",expens);
  }

  //Update Expends
  updateExpends(id:number,expens:IExpenses):Observable<IExpenses>{
    return this.expend.put("Expends",id,expens);
  }
 //Delete Expends
 deleteExpends(id:number):Observable<IExpenses> {
  return this.expend.Delete("Expends",id);
}

}
