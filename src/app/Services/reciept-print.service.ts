import { Injectable } from '@angular/core';
import { IExportReciept } from '../Interface/IExportReciept';
import { GenericService } from './GenericService/generic.service';
import { ITransactions } from '../Interface/ITransactions';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecieptPrintService {
  params=new HttpParams();
  constructor(private Serv: GenericService) { }

  ExportRecieptPrint(Id:Number){
    return this.Serv.getOne("RecieptPrint/ExportRecieptPrint",Id);
  }
  ExportCarRecieptPrint(Id:Number){
    return this.Serv.getOne("RecieptPrint/ExportCarRecieptPrint",Id);
  }
  ImportRecieptPrint(Id:Number){
    return this.Serv.getOne("RecieptPrint/ImportRecieptPrint",Id);
  }
  
  RecieptPreview(reciept:IExportReciept){
    return this.Serv.Post("RecieptPrint/RecieptPreview",reciept);
  }
  CustomerAccounts(trans:ITransactions[],total:number,totalpaid:number){
  
    return this.Serv.custAccountprint("RecieptPrint/CustomerAccount",trans,total,totalpaid);
  }

}
