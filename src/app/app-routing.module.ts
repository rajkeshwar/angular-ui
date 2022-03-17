import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AccountstatementComponent } from "./accountstatement/accountstatement.component";
import { AddpayeeComponent } from "./addpayee/addpayee.component";
import { CustomercreateComponent } from "./customercreate/customercreate.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { FundComponent } from "./fund/fund.component";
import { HomeComponent } from "./home/home.component";
import { ImpsComponent } from "./imps/imps.component";
import { LoginComponent } from "./login/login.component";
import { PaymentComponent } from "./payment/payment.component";
import { RegisterComponent } from "./register/register.component";
import { RtgsComponent } from "./rtgs/rtgs.component";
import { SetnewpasswordComponent } from "./setnewpassword/setnewpassword.component";
import { SetpasswordComponent } from "./setpassword/setpassword.component";
import { UsersettingComponent } from "./usersetting/usersetting.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "home", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "account", pathMatch: "full" },
      { path: "account", component: AccountComponent },
      { path: "addpayee", component: AddpayeeComponent },
      { path: "payment", component: PaymentComponent },
      { path: "accountstatement", component: AccountstatementComponent },
      { path: "usersetting", component: UsersettingComponent },
      { path: "setnewpassword", component: SetnewpasswordComponent },
    ],
  },
  { path: "customercreate", component: CustomercreateComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "setpassword", component: SetpasswordComponent },
  { path: "fund", component: FundComponent },
  { path: "rtgs", component: RtgsComponent },
  { path: "imps", component: ImpsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
