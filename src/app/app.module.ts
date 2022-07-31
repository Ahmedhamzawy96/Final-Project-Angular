import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ImportRecieptComponent } from './Reciepts/import-reciept/import-reciept.component';
import { RecieptPrintComponent } from './Reciepts/import-reciept/reciept-print/reciept-print.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CarsAccountsComponent } from './cars-accounts/cars-accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { SupplierAccountsComponent } from './supplier-accounts/supplier-accounts.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ImportRecieptComponent,
    RecieptPrintComponent,
    TransactionsComponent,
    CarsAccountsComponent,
    CustomerAccountsComponent,
    SupplierAccountsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
