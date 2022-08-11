import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic.service';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
@Injectable({
  providedIn: 'root'
})
export class ImportReceiptService {
  constructor(private Serv:GenericService) { }

//Get Reciepts 
  getReciepts():Observable<IImportReciept[]> {
    return this.Serv.getAll("ImportReciept");
  }

// Get Receipt By ID 
  getRecieptsByID(id:number):Observable<IImportReciept> {
    return this.Serv.getOne("ImportReciept",id);
  }
//Add Receipt 
  addReciept(recipt:IImportReciept): Observable<IImportReciept>{
    return this.Serv.Post("ImportReciept",recipt);
  }
//Update Reciept 
  updateReciept(id:number,recipt:IImportReciept):Observable<IImportReciept>{
    return this.Serv.put("ImportReciept",id,recipt);
  }
  //Delete Reciept 
  deleteReceipt(id:number):Observable<IImportReciept> {
    return this.Serv.Delete("ImportReciept",id);
  }
  };






