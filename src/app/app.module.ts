import { ReceiptforcarComponent } from './Components/receiptforcar/receiptforcar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RecieptPrintComponent } from './Components/reciept-print/reciept-print.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReceiptforcarComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
