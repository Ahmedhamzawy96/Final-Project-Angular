import { reportTotal } from './../../Interface/ReportTotal';
import { ITransactions } from './../../Interface/ITransactions';
import { GenericService } from './../GenericService/generic.service';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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
}
