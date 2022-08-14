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
import { ReportsComponent } from './Components/reports/reports.component';
import { CustmersReportsComponent } from './Components/custmers-reports/custmers-reports.component';
import { SpreportsComponent } from './Components/spreports/spreports.component';
import { CarreportComponent } from './Components/carreport/carreport.component';
import { StartComponent } from './Components/start/start.component';

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
    CustmersReportsComponent,
    SpreportsComponent,
    CarreportComponent,
    StartComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
