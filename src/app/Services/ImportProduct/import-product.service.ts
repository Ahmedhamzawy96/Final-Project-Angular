import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic.service';
import { Observable } from 'rxjs';
import { IImportProduct } from 'src/app/Interface/IImportProduct';
@Injectable({
  providedIn: 'root'
})
export class ImportProductService {



  constructor(private impproduct:GenericService) { }

  //Get ImportProduct
  getImportProduct():Observable<IImportProduct[]>{
    return this.impproduct.getAll("ImportProduct");
  }

  // Get ImportProduct By ID
  getImportProductByID(id:number):Observable<IImportProduct> {
    return this.impproduct.getOne("ImportProduct",id);
  }

  //Add ImportProduct
  addImportProduct(impprod:IImportProduct): Observable<IImportProduct>{
    return this.impproduct.Post("ImportProduct",impprod);
  }

  //Update ImportProduct
  updateImportProduct(id:number,expens:IImportProduct):Observable<IImportProduct>{
    return this.impproduct.put("ImportProduct",id,expens);
  }
 //Delete ImportProduct
 deleteImportProduct(id:number):Observable<IImportProduct> {
  return this.impproduct.Delete("ImportProduct",id);
}
  }

