import { EmployeeGuard } from './Guards/Employee/employee.guard';
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
import { StartComponent } from './Components/start/start.component';
import { SupliersComponent } from './Components/supliers/supliers.component';
import { SupplierAccountsComponent } from './Components/supplier-accounts/supplier-accounts.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { UsersComponent } from './Components/users/users.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { CustmersReportsComponent } from './Components/custmers-reports/custmers-reports.component';
import { SpreportsComponent } from './Components/spreports/spreports.component';
import { CarreportComponent } from './Components/carreport/carreport.component';
import { ErorrComponent } from './Components/erorr/erorr.component';
import { ExportRecRefundComponent } from './Components/export-rec-refund/export-rec-refund.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { AdminGuard } from './Guards/Admin/admin.guard';
import { CarDriverGuard } from './Guards/Car-Driver/car-driver.guard';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  {
    path: '',
    component: StartComponent,
    children: [
      { path: 'Login', component: LoginComponent },
      { path: 'Home', component: StartComponent,canActivate:[AuthGuard] },
      { path: 'importreciept', component: ImportRecieptComponent,canActivate:[CarDriverGuard]  },
      { path: 'cars-accounts', component: CarsAccountsComponent,canActivate:[CarDriverGuard]  },
      { path: 'supplier-accounts', component: SupplierAccountsComponent ,canActivate:[CarDriverGuard] },
      { path: 'customer-accounts', component: CustomerAccountsComponent,canActivate:[CarDriverGuard]  },
      { path: 'car-data', component: CarDataComponent,canActivate:[CarDriverGuard]  },
      { path: 'car-store', component: CarStoreComponent ,canActivate:[AuthGuard] },
      { path: 'customer', component: CustomerComponent,canActivate:[AuthGuard]  },
      { path: 'expendns', component: ExpendnsComponent ,canActivate:[CarDriverGuard] },
      { path: 'products', component: ProductsComponent,canActivate:[CarDriverGuard]  },
      { path: 'supliers', component: SupliersComponent,canActivate:[CarDriverGuard]  },
      { path: 'Transaction', component: TransactionsComponent,canActivate:[CarDriverGuard]  },
      { path: 'Receiptforcar', component: ReceiptforcarComponent,canActivate:[CarDriverGuard]  },
      { path: 'Receiptforstore', component: ReceiptforstoreComponent,canActivate:[AuthGuard]  },
      { path: 'ImportRecieptPrint/:id', component: RecieptPrintComponent,canActivate:[CarDriverGuard]  },
      {
        path: 'ExportRecieptPrint/:id',
        component: ExportRecieptPrintComponent,canActivate:[CarDriverGuard] ,
      },
      { path: 'users', component: UsersComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'custmers-reports', component: CustmersReportsComponent },
      { path: 'spreports', component: SpreportsComponent },
      { path: 'carreport', component: CarreportComponent },
      { path: 'ExportRecRefund', component: ExportRecRefundComponent },

    ],
  },
  { path: '**', component: ErorrComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
