 import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
 import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { CustomerAccountsComponent } from './Components/customer-accounts/customer-accounts.component';
  import { LoginComponent } from './Components/login/login.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
    import { MatTabsModule } from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { ReportCustomerReceiptsComponent } from './Components/Reports-Folder/report-customer-receipts/report-customer-receipts.component';
    import { NgxSelectModule } from 'ngx-select-ex';
  import { NgxPrintModule } from 'ngx-print';
 import { RegisterationsComponent } from './Components/registerations/registerations.component';
@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
      CustomerAccountsComponent,
       ReportCustomerReceiptsComponent,
     RegisterationsComponent,
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
