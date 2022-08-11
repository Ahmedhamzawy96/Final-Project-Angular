import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExportProduct } from 'src/app/interface/IExportProduct';
import { GenericService } from '../GenericService/generic.service';
@Injectable({
  providedIn: 'root'
})
export class ExportProductService {

  constructor(private Serv:GenericService) { }
//Get ExportProduct 
getReciepts():Observable<IExportProduct[]> {
  return this.Serv.getAll("ExportProduct");
}
// Get ExportProduct By ID 
getRecieptsByID(id:number):Observable<IExportProduct> {
  return this.Serv.getOne("ExportProduct",id);
}
//Add ExportProduct 
addReciept(recipt:IExportProduct): Observable<IExportProduct>{
  return this.Serv.Post("ExportProduct",recipt);
}
//Update ExportProduct 
updateReciept(id:number,recipt:IExportProduct):Observable<IExportProduct>{
  return this.Serv.put("ExportProduct",id,recipt);
}
//Delete ExportProduct 
deleteReceipt(id:number):Observable<IExportProduct> {
  return this.Serv.Delete("ExportProduct",id);
}


}
