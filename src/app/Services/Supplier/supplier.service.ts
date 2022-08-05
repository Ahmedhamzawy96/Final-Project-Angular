import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISupplier } from 'src/app/Interface/ISupplier';


@Injectable({
  providedIn: 'root'
})

export class SupplierService {
 supellier:ISupplier[];

  constructor(private httpclient:HttpClient) { }
  GetAllSuppliers():Observable<ISupplier[]>
  {
  return this.httpclient.get<ISupplier[]>(`http://localhost:5500/api/supplier`);
  }
}
