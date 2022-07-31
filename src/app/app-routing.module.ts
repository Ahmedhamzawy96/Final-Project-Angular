import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportRecieptComponent } from './Reciepts/import-reciept/import-reciept.component';
import { RecieptPrintComponent } from './Reciepts/import-reciept/reciept-print/reciept-print.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CarsAccountsComponent } from './cars-accounts/cars-accounts.component';
import { SupplierAccountsComponent } from './supplier-accounts/supplier-accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';


const routes: Routes = [
  { path: 'importreciept', component: ImportRecieptComponent },
  {path:'Transaction',component:TransactionsComponent},
  { path: 'cars-accounts', component: CarsAccountsComponent },
  { path:'supplier-accounts', component: SupplierAccountsComponent },
  {path:'customer-accounts',component:CustomerAccountsComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
