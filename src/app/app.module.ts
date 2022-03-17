import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomercreateComponent } from './customercreate/customercreate.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { UsersettingComponent } from './usersetting/usersetting.component';
import { AddpayeeComponent } from './addpayee/addpayee.component';
import { FundComponent } from './fund/fund.component';
import { AccountstatementComponent } from './accountstatement/accountstatement.component';
import { SetnewpasswordComponent } from './setnewpassword/setnewpassword.component';
import { RtgsComponent } from './rtgs/rtgs.component';
import { ImpsComponent } from './imps/imps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountComponent,
    ForgotComponent,
    DashboardComponent,
    PaymentComponent,
    ForgotPasswordComponent,
    CustomercreateComponent,
    SetpasswordComponent,
    UsersettingComponent,
    AddpayeeComponent,
    FundComponent,
    AccountstatementComponent,
    SetnewpasswordComponent,
    RtgsComponent,
    ImpsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
