import { IImportReciept } from "./IImportReciept";
import { IProduct } from "./IProduct";

export interface IImportProduct{

  Quantity:number,
  TotalPrice:number,
  Price:number,
  ImportReciept:IImportReciept[],
  Product:IProduct[],
  ReceiptID:number,
  ProductID:number

}
