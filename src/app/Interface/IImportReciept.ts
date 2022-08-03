import { IImportProduct } from "./IImportProduct";
import { ISupplier } from "./ISupplier";
import { IUsers } from "./IUsers";

export interface IImportReciept{

  ID:Number,
  Notes:string,
  Date:Date,
  Paid:number,
  Remaining:number,
  Supplier:ISupplier[],
  User:IUsers[],
  SupplierID? :number,
  UserName:string,
  ImportProducts:IImportProduct[]

}
