import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDataComponent } from './Components/car-data/car-data.component';
import { CarStoreComponent } from './Components/car-store/car-store.component';
import { CarsAccountsComponent } from './Components/cars-accounts/cars-accounts.component';
import { CustomerAccountsComponent } from './Components/customer-accounts/customer-accounts.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { ExpendnsComponent } from './Components/expendns/expendns.component';
import { ExportRecieptPrintComponent } from './Components/export-reciept-print/export-reciept-print.component';
import { RecieptPrintComponent } from './Components/Import-RecieptPrint/reciept-print.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { ReceiptforcarComponent } from './Components/receiptforcar/receiptforcar.component';
import { ReceiptforstoreComponent } from './Components/receiptforstore/receiptforstore.component';
import { ImportRecieptComponent } from './Components/Reciepts/import-reciept/import-reciept.component';
import { SupliersComponent } from './Components/supliers/supliers.component';
import { SupplierAccountsComponent } from './Components/supplier-accounts/supplier-accounts.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { UsersComponent } from './Components/users/users.component';




const routes: Routes = [
  { path: 'importreciept', component: ImportRecieptComponent  },
  { path: 'cars-accounts', component: CarsAccountsComponent },
  { path:'supplier-accounts', component:SupplierAccountsComponent  },
  {path:'customer-accounts',component:CustomerAccountsComponent },
  { path:'car-data', component:CarDataComponent },
  {path:'car-store', component:CarStoreComponent },
  {path:'customer', component:CustomerComponent },
  {path:'expendns', component:ExpendnsComponent },
  {path:'products', component:ProductsComponent },
  {path:'supliers', component:SupliersComponent },
  {path:'login', component:LoginComponent },
  {path:'Transaction',component:TransactionsComponent},
  {path:'Receiptforcar',component:ReceiptforcarComponent},
  {path:'Receiptforstore',component:ReceiptforstoreComponent},
  {path:'ImportRecieptPrint/:id',component:RecieptPrintComponent},
  {path:'ExportRecieptPrint/:id',component:ExportRecieptPrintComponent},
  {path:'users',component:UsersComponent}

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
