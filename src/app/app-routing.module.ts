import { ReportsTotalComponent } from './Components/Reports-Folder/reports-total/reports-total.component';
import { ReportsCARReceiptsComponent } from './Components/Reports-Folder/reports-car-receipts/reports-car-receipts.component';
import { ReportsCARAccountComponent } from './Components/Reports-Folder/reports-car-account/reports-car-account.component';
import { ReportsSupplierReceiptComponent } from './Components/Reports-Folder/reports-supplier-receipt/reports-supplier-receipt.component';
import { ReportsSupplierAccountComponent } from './Components/Reports-Folder/reports-supplier-account/reports-supplier-account.component';
import { ReportCustomerReceiptsComponent } from './Components/Reports-Folder/report-customer-receipts/report-customer-receipts.component';
import { ReportCustomerAccountsComponent } from './Components/Reports-Folder/report-customer-accounts/report-customer-accounts.component';
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
import { ReportsComponent } from './Components/Reports-Folder/reports-main/reports.component';
import { ErorrComponent } from './Components/erorr/erorr.component';
import { ExportRecRefundComponent } from './Components/Refunds/export-rec-refund/export-rec-refund.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { AdminGuard } from './Guards/Admin/admin.guard';
import { CarDriverGuard } from './Guards/Car-Driver/car-driver.guard';
import { HomeComponent } from './Components/home/home.component';
import { CarRecPrintComponent } from './Components/car-rec-print/car-rec-print.component';
import { ReceiptfromcarComponent } from './Components/receiptfromcar/receiptfromcar.component';
import { MainRefundComponent } from './Components/Refunds/main-refund/main-refund.component';
import { ImportRecRefundComponent } from './Components/Refunds/import-rec-refund/import-rec-refund.component';
import { FromCarRefundComponent } from './Components/Refunds/from-car-refund/from-car-refund.component';
import { ToCarRefundComponent } from './Components/Refunds/to-car-refund/to-car-refund.component';
import { StoreReportComponent } from './Components/Reports-Folder/reports-store/store-report.component';
import { ReportsCustomerTotalComponent } from './Components/Reports-Folder/reports-customer-total/reports-customer-total.component';
import { ReportsSupplierTotalComponent } from './Components/Reports-Folder/reports-supplier-total/reports-supplier-total.component';
import { CarSellReceiptReportComponent } from './Components/Reports-Folder/car-sell-receipt-report/car-sell-receipt-report.component';
import { ReportTotalStoreComponent } from './Components/Reports-Folder/report-total-store/report-total-store.component';
import { ProfitMarginCarComponent } from './Components/Reports-Folder/Report-profit-margin-car/profit-margin-car.component';
import { ProfitMarginStoreComponent } from './Components/Reports-Folder/Report-profit-margin-store/profit-margin-store.component';
import { RecieptPricePreviewComponent } from './Components/reciept-price-preview/reciept-price-preview.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: '',
    component: StartComponent,
    children: [
      { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'ExportRecieptPrint/:id',component: ExportRecieptPrintComponent},
      {
        path: 'ImportRecieptPrint/:id',
        component: RecieptPrintComponent,
        canActivate: [CarDriverGuard],
      },
            {
            path: 'CarRecieptPrint/:id',
            component: CarRecPrintComponent,
            canActivate: [CarDriverGuard],
          },
      {
        path: 'importreciept',
        component: ImportRecieptComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'cars-accounts',
        component: CarsAccountsComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'supplier-accounts',
        component: SupplierAccountsComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'customer-accounts',
        component: CustomerAccountsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'car-data',
        component: CarDataComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'car-store',
        component: CarStoreComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'RecieptPricePreview',
        component: RecieptPricePreviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Refund',
        component: MainRefundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ExportRecRefund/:id',
        component: ExportRecRefundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ImportRecRefund/:id',
        component: ImportRecRefundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FromCarRecRefund/:id',
        component: FromCarRefundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ToCarRecRefund/:id',
        component: ToCarRefundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'expendns',
        component: ExpendnsComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'ProductQuantity',
        component: ProductQuantityComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'supliers',
        component: SupliersComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'Transaction',
        component: TransactionsComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'Receiptforcar',
        component: ReceiptforcarComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'Receiptforstore',
        component: ReceiptforstoreComponent,
        canActivate: [CarDriverGuard],
      },
      {
        path: 'ReceiptFormCar',
        component: ReceiptfromcarComponent,
        canActivate: [EmployeeGuard],
      },
      // {
      //   path: 'ImportRecieptPrint/:id',
      //   component: RecieptPrintComponent,
      //   canActivate: [CarDriverGuard],
      // },
      // {
      //   path: 'ExportRecieptPrint/:id',
      //   component: ExportRecieptPrintComponent,
      // },
      // {
      //   path: 'CarRecieptPrint/:id',
      //   component: CarRecPrintComponent,
      //   canActivate: [CarDriverGuard],
      // },

      { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'ExportRecRefund',
        component: ExportRecRefundComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCAccounts/:id',
        component: ReportCustomerAccountsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCReceipts/:id',
        component: ReportCustomerReceiptsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RSAccounts/:id',
        component: ReportsSupplierAccountComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RSReceipts/:id',
        component: ReportsSupplierReceiptComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCARAccounts/:id',
        component: ReportsCARAccountComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCARReceipts/:id',
        component: ReportsCARReceiptsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RTotal',
        component: ReportsTotalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'SotreTotal',
        component: StoreReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'CustTotal',
        component: ReportsCustomerTotalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'SuppTotal',
        component: ReportsSupplierTotalComponent,
        canActivate: [AdminGuard],
      },
      { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'ExportRecRefund',
        component: ExportRecRefundComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCAccounts/:id',
        component: ReportCustomerAccountsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCReceipts/:id',
        component: ReportCustomerReceiptsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RSAccounts/:id',
        component: ReportsSupplierAccountComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RSReceipts/:id',
        component: ReportsSupplierReceiptComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCARAccounts/:id',
        component: ReportsCARAccountComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RCARReceipts/:id',
        component: ReportsCARReceiptsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'RTotal',
        component: ReportsTotalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'SotreTotal',
        component: StoreReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'CustTotal',
        component: ReportsCustomerTotalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'SuppTotal',
        component: ReportsSupplierTotalComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'CARSRR/:id',
        component: CarSellReceiptReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'ٌStoreNetProfit',
        component: ReportTotalStoreComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'CarProfit/:id',
        component: ProfitMarginCarComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'StoreProfit',
        component: ProfitMarginStoreComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: '**', component: ErorrComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
