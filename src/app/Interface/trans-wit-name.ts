import { ITransactions } from "./ITransactions";

export interface TransWitName {

    transactions:ITransactions,
    custname:string
}


export interface Itotaltranswithname
{
    transactionandname:TransWitName[],
    paid:number,
    get:number
}

