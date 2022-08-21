export interface ITransactions {
  id: number;
  accountID: number;
  accountType: number;
  paid?: number;
  remaining?: number;
  type: number;
  operationID?: number;
  operation: number;
  date: string;
  userName: string;
  notes: string;
  Name: string;
}
