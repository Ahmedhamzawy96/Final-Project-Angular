import { ICar } from "./ICar"
import { IExportReciept } from "./IExportReciept"
import { IImportReciept } from "./IImportReciept"

export interface IUsers{

  UserName:string,
  Password:string,
  Type:number,
  CarID:number
  Car:ICar[],
  ImportReciepts:IImportReciept[],
  ExportReciepts:IExportReciept[]

}

