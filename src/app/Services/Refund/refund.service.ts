import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class RefundService {
  constructor(private serv: GenericService) {}

  exportRecRefund(id: Number, item: IExportReciept) {
    return this.serv.refund('Refund/Export', id, item);
  }
  importRecRefund(id: Number, item: IImportReciept) {
    return this.serv.refund('Refund/Import', id, item);
  }

  FromCarRecRefund(id: Number, item: IExportReciept) {
    return this.serv.refund('Refund/Car', id, item);
  }
  toCarRecRefund(id: Number, item: IExportReciept) {
    return this.serv.refund('Refund/toCar', id, item);
  }
  FilterReceipt(id: Number) {
    return this.serv.getOne('Refund/ReceiptsFilter', id);
  }
}
