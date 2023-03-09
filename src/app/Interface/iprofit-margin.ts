import { ReceiptProfit } from "./receipt-profit";

export interface IProfitMargin {
    receipts:ReceiptProfit[],
    buyingprice:number,
    sellingPrice:number
}
