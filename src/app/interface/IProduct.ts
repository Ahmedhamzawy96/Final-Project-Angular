import { ICarProduct } from "./ICarProduct";
import { IExportProduct } from "./IExportProduct";
import { IImportProduct } from "./IImportProduct";

export interface IProduct{

  id:Number,
  name:string,
  buyingPrice:number,
  sellingPrice:number,
  quantity:number
}

