import { IImportProduct } from "./IImportProduct";
import { ISupplier } from "./ISupplier";
import { IUsers } from "./IUsers";

export interface IImportReciept{

  id:Number,
  total:number,
  notes:string,
  date:Date,
  paid:number,
  remaining:number,
  supplierID? :number,
  supplierName:string,
  userName:string,
}
