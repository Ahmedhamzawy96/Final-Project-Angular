import { IImportProduct } from "./IImportProduct";
export interface IImportReciept{

  id:Number,
  total:number,
  notes:string,
  date:string,
  paid:number,
  remaining:number,
  supid? :number,
  userName:string,
  importProducts:IImportProduct[]
}
