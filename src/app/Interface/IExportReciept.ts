import { IExportProduct } from "./IExportProduct";

export interface IExportReciept{

  id:number,
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


