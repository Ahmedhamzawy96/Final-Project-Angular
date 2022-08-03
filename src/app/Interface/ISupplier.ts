import { IImportReciept } from "./IImportReciept";

export interface ISupplier{
  ID:Number,
  Name:string,
  Phone:string,
  Amount:Number,
  Notes: string,
  ImportReciepts:IImportReciept[]

}




