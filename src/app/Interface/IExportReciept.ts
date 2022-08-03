import { ICar } from "./ICar";
import { ICustomer } from "./ICustomer";
import { IExportProduct } from "./IExportProduct";
import { IUsers } from "./IUsers";

export interface IExportReciept{

  ID:Number,
  Notes:string,
  Date:Date,
  Paid:number,
  Remaining:number
  customer :ICustomer [];
  User:IUsers[],
  CarSell:ICar[],
  CarBuy:ICar[],
  CustomerID? :number,
  UserName:string,
  CarSellID?:number,
  CarBuyID?:number,
  ExportProducts:IExportProduct[]
}


