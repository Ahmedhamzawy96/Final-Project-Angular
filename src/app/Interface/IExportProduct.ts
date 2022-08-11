import { IExportReciept } from "./IExportReciept"
import { IProduct } from "./IProduct"

export interface IExportProduct{
  
  exportRecieptID?:Number,
  productName:string,
  productID:Number
  quantity:number,
  totalPrice:number,
  productPrice:number,
}
