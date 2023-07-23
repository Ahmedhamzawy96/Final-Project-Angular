import { reportTotal } from './../../Interface/ReportTotal';
import { ITransactions } from './../../Interface/ITransactions';
import { GenericService } from './../GenericService/generic.service';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Transacwithtotal } from 'src/app/Interface/transacwithtotal';
import { IProfitMargin } from 'src/app/Interface/iprofit-margin';
import { ICartotaltranswithname } from 'src/app/Interface/trans-wit-name';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private Dates: Date[] = [];
  constructor(private genserv: GenericService) {}
  addDates(dates: Date[]) {
    this.Dates = dates;
  }
  getDates(): Date[] {
    return this.Dates;
  }

  Custtransactions(
    id: number,
    Type: number,
    date: Date[]
  ): Observable<ITransactions[]> {
    return this.genserv.getRepoTransaction(
      'Report',
      id,
      Type,
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
  getImportProduct(date: Date[]): Observable<reportTotal> {
    return this.genserv.getTotalTransaction(
      'Report/Total',
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
  getCarSellTransactions(carid:number,date: Date[]): Observable<ICartotaltranswithname> {
    return this.genserv.getRepoTransactionNoType(
      'Report',
      carid,
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
  geTotalStore(date: Date[]): Observable<Transacwithtotal> {
    return this.genserv.getTotalTransaction(
      'Report/StoreTotal',
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
  ProfitMarginforStore(date: Date[]): Observable<IProfitMargin> {
    return this.genserv.getTotalTransaction(
      'Report/ProfitMargin',
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
  ProfitMarginforCar(date: Date[],id:number): Observable<IProfitMargin> {
    return this.genserv.getRepoTransactionNoType(
      'Report/ProfitMargin',
      id,
      date[0].toDateString(),
      date[date.length - 1].toDateString()
    );
  }
}
