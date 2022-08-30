import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarProduct } from 'src/app/Interface/ICarProduct';
import { IProduct } from 'src/app/Interface/IProduct';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class CarProductService {

  constructor(private serv:GenericService) { }

  //Get Products 
  getProducts(carId : number):Observable<ICarProduct[]>{
    return this.serv.getAll(`CarProduct/${carId}`);
  }
  //Get Product By ID
  getProductByID(id:number):Observable<ICarProduct>{
    return this.serv.getOne("CarProduct",id);
  }
  //Add Product
  addProduct(product:IProduct):Observable<ICarProduct>{
    return this.serv.Post("CarProduct",product);
  }
  //Update Product
  updateProduct(id:number,product:IProduct):Observable<ICarProduct>{
    return this.serv.put("CarProduct",id,product);
  }
  //Delete Product
  deleteProduct(id:number):Observable<ICarProduct>{
    return this.serv.Delete("CarProduct",id);
  }
}
