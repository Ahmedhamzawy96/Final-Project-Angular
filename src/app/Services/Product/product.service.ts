import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic.service';
import {IProduct} from 'src/app/Interface/IProduct'
@Injectable({
  providedIn: 'root'
}) 
export class ProductService {


  constructor(private Serv:GenericService) { }

//Get Reciepts 
  getReciepts():Observable<IProduct[]> {
    return this.Serv.getAll("Product");
  }

// Get Receipt By ID 
  getRecieptsByID(id:number):Observable<IProduct> {
    return this.Serv.getOne("Product",id);
  }
//Add Receipt 
  addReciept(recipt:IProduct): Observable<IProduct>{
    return this.Serv.Post("Product",recipt);
  }
//Update Reciept 
  updateReciept(id:number,recipt:IProduct):Observable<IProduct>{
    return this.Serv.put("Product",id,recipt);
  }
  //Delete Reciept 
  deleteReceipt(id:number):Observable<IProduct> {
    return this.Serv.Delete("Product",id);
  }

}

