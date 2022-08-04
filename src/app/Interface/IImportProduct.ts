import { IImportReciept } from "./IImportReciept";
import { IProduct } from "./IProduct";

export interface IImportProduct{

  ImportRecieptID:number,
  ProductID:number
  ProductName:string,
  Quantity:number,
  TotalPrice:number,
  BuyingPrice:number,
}
