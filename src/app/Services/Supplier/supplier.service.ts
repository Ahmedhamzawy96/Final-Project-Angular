import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { GenericService } from '../GenericService/generic.service';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private supp:GenericService) { }

   //Get Supplier 
   getSupplier():Observable<ISupplier[]>{
    return this.supp.getAll("Supplier");
  }
  //Get Supplier By ID
  getSupplierByID(id:number):Observable<ISupplier>{
    return this.supp.getOne("Supplier",id);
  }
  //Add Supplier
  addSupplier(Supplier:ISupplier):Observable<ISupplier>{
    return this.supp.Post("Supplier",Supplier);
  }
  //Update Supplier
  updateSupplier(id:number,Supplier:ISupplier):Observable<ISupplier>{
    return this.supp.put("Supplier",id,Supplier);
  }
  //Delete Supplier
  deleteSupplier(id:number):Observable<ISupplier>{
    return this.supp.Delete("Supplier",id);
  }
}
