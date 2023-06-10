 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { CustomerAccountsComponent } from './Components/customer-accounts/customer-accounts.component';

import { RegisterationsComponent } from './Components/registerations/registerations.component';
import { ReportCustomerReceiptsComponent } from './Components/Reports-Folder/report-customer-receipts/report-customer-receipts.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Guards/Auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterationsComponent },
  { path: 'Transfer', component: CustomerAccountsComponent },
  { path: 'History', component: ReportCustomerReceiptsComponent },

 
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
