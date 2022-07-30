import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportRecieptComponent } from './Reciepts/import-reciept/import-reciept.component';
import { RecieptPrintComponent } from './Reciepts/import-reciept/reciept-print/reciept-print.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  { path: 'importreciept', component: ImportRecieptComponent },
  {path:'Transaction',component:TransactionsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
