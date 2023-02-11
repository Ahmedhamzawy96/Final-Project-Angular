import { Injectable } from '@angular/core';
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
}
