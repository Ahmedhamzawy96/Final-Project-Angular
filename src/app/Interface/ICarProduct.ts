import { ICar } from "./ICar";
import { IProduct } from "./IProduct";

export interface ICarProduct
{
  Quantity:Number,
  CarID:number,
  ProductID:number,
  Product:IProduct[],
  Car:ICar[]
}
