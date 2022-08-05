import { Observable } from 'rxjs';
import { IImportReciept } from './../../Interface/IImportReciept';
import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic.service';
@Injectable({
  providedIn: 'root'
})
export class ImportReceiptService {
  constructor(private Serv:GenericService) { }

//Get Reciepts 
  getReciepts():Observable<IImportReciept[]> {
    return this.Serv.getAll("ImpoerReciept");
  }

// Get Receipt By ID 
  getRecieptsByID(id:number):Observable<IImportReciept> {
    return this.Serv.getOne("ImpoerReciept",id);
  }
//Add Receipt 
  addReciept(recipt:IImportReciept): Observable<IImportReciept>{
    return this.Serv.Post("ImpoerReciept",recipt);
  }
//Update Reciept 
  updateReciept(id:number,recipt:IImportReciept):Observable<IImportReciept>{
    return this.Serv.put("ImpoerReciept",id,recipt);
  }
  //Delete Reciept 
  deleteReceipt(id:number):Observable<IImportReciept> {
    return this.Serv.Delete("ImpoerReciept",id);
  }
  };






