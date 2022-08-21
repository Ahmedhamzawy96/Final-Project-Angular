import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class RefundService {
  constructor(private serv: GenericService) {}

  exportRecRefund(id: Number, item: IExportReciept) {
    return this.serv.refund('Refund', id, item);
  }
}
