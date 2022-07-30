import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ImportRecieptComponent } from './Reciepts/import-reciept/import-reciept.component';
import { RecieptPrintComponent } from './Reciepts/import-reciept/reciept-print/reciept-print.component';
import { CarDataComponent } from './car-data/car-data.component';
import { CarStoreComponent } from './car-store/car-store.component';
import { CustomerComponent } from './customer/customer.component';
import { ExpendnsComponent } from './expendns/expendns.component';
import { ProductsComponent } from './products/products.component';
import { SupliersComponent } from './supliers/supliers.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionsComponent } from './transactions/transactions.component';




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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
