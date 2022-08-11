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
  getProducts():Observable<IProduct[]> {
    return this.Serv.getAll("Product");
  }

// Get Receipt By ID 
  getProductsByID(id:number):Observable<IProduct> {
    return this.Serv.getOne("Product",id);
  }
//Add Receipt 
  addProduct(recipt:IProduct): Observable<IProduct>{
    return this.Serv.Post("Product",recipt);
  }
//Update Reciept 
  updateProduct(id:number,recipt:IProduct):Observable<IProduct>{
    return this.Serv.put("Product",id,recipt);
  }
  //Delete Reciept 
  deleteProduct(id:number):Observable<IProduct> {
    return this.Serv.Delete("Product",id);
  }

}

