import { Injectable } from '@angular/core';
import { IExportReciept } from '../Interface/IExportReciept';
import { GenericService } from './GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class RecieptPrintService {

  constructor(private Serv: GenericService) { }

  ExportRecieptPrint(Id:Number){
    return this.Serv.getOne("RecieptPrint/ExportRecieptPrint",Id);
  }
  ImportRecieptPrint(Id:Number){
    return this.Serv.getOne("RecieptPrint/ImportRecieptPrint",Id);
  }
  RecieptPreview(reciept:IExportReciept){
    return this.Serv.Post("RecieptPrint/RecieptPreview",reciept);
  }
}
