import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AccountstatementComponent } from "./accountstatement/accountstatement.component";
import { AddpayeeComponent } from "./addpayee/addpayee.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AuthGuard } from "./auth.guard";
import { CustomercreateComponent } from "./customercreate/customercreate.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PaymentComponent } from "./payment/payment.component";
import { RegisterComponent } from "./register/register.component";
import { SetnewpasswordComponent } from "./setnewpassword/setnewpassword.component";
import { SetpasswordComponent } from "./setpassword/setpassword.component";
import { UsersettingComponent } from "./usersetting/usersetting.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "account", pathMatch: "full" },
      { path: "account", component: AccountComponent },
      { path: "addpayee", component: AddpayeeComponent },
      { path: "payment", component: PaymentComponent },
      { path: "accountstatement", component: AccountstatementComponent },
      { path: "usersetting", component: UsersettingComponent },
      { path: "setpassword", component: SetpasswordComponent },
    ],
  },
  {
    path: "customercreate",
    component: CustomercreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "setnewpassword",
    component: SetnewpasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admindashboard",
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
