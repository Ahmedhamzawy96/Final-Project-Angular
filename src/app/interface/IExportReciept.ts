export interface IExportReciept{

  id:Number,
  total:number,
  notes:string,
  date:Date,
  paid:number,
  remaining:number
  customerID?:number;
  userName:string,
  carID?:number
}


