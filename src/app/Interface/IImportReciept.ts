import { IImportProduct } from "./IImportProduct";
import { ISupplier } from "./ISupplier";
import { IUsers } from "./IUsers";

export interface IImportReciept{

  ID:Number,
  Total:number,
  Notes:string,
  Date:Date,
  Paid:number,
  Remaining:number,
  SupplierID? :number,
  SupplierName:string,
  UserName:string,
}
