import { IExportReciept } from "./IExportReciept"
import { IProduct } from "./IProduct"

export interface IExportProduct{
  Quantity:number,
  TotalPrice:number,
  Price:number,
  ExportReciept:IExportReciept[],
  Product:IProduct[],
  ReceiptID:number,
  ProductID:number
}
