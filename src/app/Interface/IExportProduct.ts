import { IExportReciept } from "./IExportReciept"
import { IProduct } from "./IProduct"

export interface IExportProduct{
  
  ExportRecieptID:number,
  ProductName:string,
  ProductID:number
  Quantity:number,
  TotalPrice:number,
  ProductPrice:number,
}
