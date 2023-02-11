import { ReceiptforcarComponent } from './Components/receiptforcar/receiptforcar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RecieptPrintComponent } from './Components/Import-RecieptPrint/reciept-print.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarDataComponent } from './Components/car-data/car-data.component';
import { CarStoreComponent } from './Components/car-store/car-store.component';
import { CarsAccountsComponent } from './Components/cars-accounts/cars-accounts.component';
import { CustomerAccountsComponent } from './Components/customer-accounts/customer-accounts.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { ExpendnsComponent } from './Components/expendns/expendns.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { ReceiptforstoreComponent } from './Components/receiptforstore/receiptforstore.component';
import { ImportRecieptComponent } from './Components/Reciepts/import-reciept/import-reciept.component';
import { SupliersComponent } from './Components/supliers/supliers.component';
import { SupplierAccountsComponent } from './Components/supplier-accounts/supplier-accounts.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ExportRecieptPrintComponent } from './Components/export-reciept-print/export-reciept-print.component';
import { UsersComponent } from './Components/users/users.component';
import { ReportsComponent } from './Components/Reports-Folder/reports-main/reports.component';
import { StartComponent } from './Components/start/start.component';
import { ErorrComponent } from './Components/erorr/erorr.component';
import { ExportRecRefundComponent } from './Components/Refunds/export-rec-refund/export-rec-refund.component';
import { HomeComponent } from './Components/home/home.component';
import { CarRecPrintComponent } from './Components/car-rec-print/car-rec-print.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportCustomerAccountsComponent } from './Components/Reports-Folder/report-customer-accounts/report-customer-accounts.component';
import { ReceiptfromcarComponent } from './Components/receiptfromcar/receiptfromcar.component';
import { ReportCustomerReceiptsComponent } from './Components/Reports-Folder/report-customer-receipts/report-customer-receipts.component';
import { ReportsSupplierReceiptComponent } from './Components/Reports-Folder/reports-supplier-receipt/reports-supplier-receipt.component';
import { ReportsSupplierAccountComponent } from './Components/Reports-Folder/reports-supplier-account/reports-supplier-account.component';
import { ReportsCARAccountComponent } from './Components/Reports-Folder/reports-car-account/reports-car-account.component';
import { ReportsCARReceiptsComponent } from './Components/Reports-Folder/reports-car-receipts/reports-car-receipts.component';
import { ReportsTotalComponent } from './Components/Reports-Folder/reports-total/reports-total.component';
import { ImportRecRefundComponent } from './Components/Refunds/import-rec-refund/import-rec-refund.component';
import { FromCarRefundComponent } from './Components/Refunds/from-car-refund/from-car-refund.component';
import { ToCarRefundComponent } from './Components/Refunds/to-car-refund/to-car-refund.component';
import { MainRefundComponent } from './Components/Refunds/main-refund/main-refund.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { StoreReportComponent } from './Components/Reports-Folder/reports-store/store-report.component';
import { ReportsCustomerTotalComponent } from './Components/Reports-Folder/reports-customer-total/reports-customer-total.component';
import { ReportsSupplierTotalComponent } from './Components/Reports-Folder/reports-supplier-total/reports-supplier-total.component';
import { CarSellReceiptReportComponent } from './Components/Reports-Folder/car-sell-receipt-report/car-sell-receipt-report.component';
import { ReportTotalStoreComponent } from './Components/Reports-Folder/report-total-store/report-total-store.component';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ImportRecieptComponent,
    RecieptPrintComponent,
    CarDataComponent,
    CarStoreComponent,
    CustomerComponent,
    ExpendnsComponent,
    ProductsComponent,
    SupliersComponent,
    LoginComponent,
    TransactionsComponent,
    CarsAccountsComponent,
    CustomerAccountsComponent,
    SupplierAccountsComponent,
    ReceiptforstoreComponent,
    ReceiptforcarComponent,
    ExportRecieptPrintComponent,
    UsersComponent,
    ReportsComponent,
    StartComponent,
    ErorrComponent,
    ExportRecRefundComponent,
    HomeComponent,
    CarRecPrintComponent,
    ReportCustomerAccountsComponent,
    ReceiptfromcarComponent,
    ReportCustomerReceiptsComponent,
    ReportsSupplierReceiptComponent,
    ReportsSupplierAccountComponent,
    ReportsCARAccountComponent,
    ReportsCARReceiptsComponent,
    ReportsTotalComponent,
    ImportRecRefundComponent,
    FromCarRefundComponent,
    ToCarRefundComponent,
    MainRefundComponent,
    StoreReportComponent,
    ReportsCustomerTotalComponent,
    ReportsSupplierTotalComponent,
    CarSellReceiptReportComponent,
    ReportTotalStoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatTabsModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxSelectModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
