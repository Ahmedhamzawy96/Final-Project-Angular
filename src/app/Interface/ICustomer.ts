import { IExportReciept } from "./IExportReciept"

export interface ICustomer{
  ID:Number,
  Name:string,
  Phone:string,
  Amount:Number,
  Notes: string,
  ExportReciepts:IExportReciept[]
}

