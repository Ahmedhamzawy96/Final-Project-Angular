import { ICarProduct } from "./ICarProduct";
import { IExportReciept } from "./IExportReciept";
import { IUsers } from "./IUsers";

export interface ICar
{
  ID:Number,
  Name:string,
  Amount:Number,
  Notes: string,
  CarProduct:ICarProduct[],
  user:IUsers[],
  ExportReciept:IExportReciept[]

  }
