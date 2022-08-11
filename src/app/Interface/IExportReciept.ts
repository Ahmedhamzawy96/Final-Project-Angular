import { ICar } from "./ICar";
import { ICustomer } from "./ICustomer";
import { IExportProduct } from "./IExportProduct";
import { IUsers } from "./IUsers";

export interface IExportReciept{

  id:Number,
  total:number,
  notes:string,
  date:Date,
  paid:number,
  remaining:number
  customerID?:number;
  userName:string,
  carID?:number,
  products:IExportProduct[]

}


