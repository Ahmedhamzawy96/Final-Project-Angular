import { ITransactions } from "./ITransactions";

 interface TransWitName {

    transactions:ITransactions,
    custname:string
}


export interface ICartotaltranswithname
{
    transactionandname:TransWitName[],
    paid:number,
    get:number
}

