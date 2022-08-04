import { ICar } from "./ICar";
import { ICustomer } from "./ICustomer";
import { IExportProduct } from "./IExportProduct";
import { IUsers } from "./IUsers";

export interface IExportReciept{

  ID:Number,
  Total:number,
  Notes:string,
  Date:Date,
  Paid:number,
  Remaining:number
  CustomerID?:number;
  CustomerName:string,
  UserName:string,
  CarSellID?:number,
  CarBuyID?:number,
}


