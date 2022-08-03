import { ICarProduct } from "./ICarProduct";
import { IExportProduct } from "./IExportProduct";
import { IImportProduct } from "./IImportProduct";

export interface IProduct{

  ID:Number,
  Name:string,
  BuyingPrice:number,
  SellingPrice:number,
  Quantity:number,
  CarProducts:ICarProduct[],
  ExportProducts:IExportProduct[],
  ImportProducts:IImportProduct[]


}

