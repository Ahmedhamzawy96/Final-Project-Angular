import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExportRecieptService {


  constructor(private Serv:GenericService) 
  { }

  //Get Reciepts 
  getReciepts():Observable<IExportReciept[]> {
    return this.Serv.getAll("ExportReciept");
  }
  // Get Receipt By ID 
  getRecieptsByID(id:number):Observable<IExportReciept> {
    return this.Serv.getOne("ExportReciept",id);
  }
  //Add Receipt 
  addReciept(recipt:IExportReciept): Observable<IExportReciept>{
    return this.Serv.Post("ExportReciept",recipt);
  }
  //Update Reciept 
  updateReciept(id:number,recipt:IExportReciept):Observable<IExportReciept>{
    return this.Serv.put("ExportReciept",id,recipt);
  }
  //Delete Reciept 
  deleteReceipt(id:number):Observable<IExportReciept> {
    return this.Serv.Delete("ExportReciept",id);
  }

}
