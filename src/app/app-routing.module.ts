import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDataComponent } from './car-data/car-data.component';
import { CarStoreComponent } from './car-store/car-store.component';
import { CustomerComponent } from './customer/customer.component';
import { ExpendnsComponent } from './expendns/expendns.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ImportRecieptComponent } from './Reciepts/import-reciept/import-reciept.component';
import { RecieptPrintComponent } from './Reciepts/import-reciept/reciept-print/reciept-print.component';
import { SupliersComponent } from './supliers/supliers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CarsAccountsComponent } from './cars-accounts/cars-accounts.component';
import { SupplierAccountsComponent } from './supplier-accounts/supplier-accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';



const routes: Routes = [
  { path: 'importreciept', component: ImportRecieptComponent },
  { path: 'cars-accounts', component: CarsAccountsComponent },
  { path:'supplier-accounts', component: SupplierAccountsComponent },
  {path:'customer-accounts',component:CustomerAccountsComponent },
  { path:'car-data', component: CarDataComponent},
  {path:'car-store', component: CarStoreComponent},
  {path:'customer', component: CustomerComponent},
  {path:'expendns', component: ExpendnsComponent},
  {path:'products', component: ProductsComponent},
  {path:'supliers', component: SupliersComponent},
  {path:'login', component: LoginComponent},
  {path:'Transaction',component:TransactionsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
