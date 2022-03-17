import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { getLoggedInUser } from "./utis";
import { User } from "./model/User";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "banking-ui";
  public user:Observable<User | null> = new BehaviorSubject<User>({
    id: 0,
    accountNo: "",
    password: "",
  });

  public routeLinks = [
    { route: "home", title: "Home" },
    { route: "account", title: "Account" },
    { route: "dashboard", title: "Dashboard" },
    { route: "login", title: "Login" },
    { route: "register", title: "Register" },
    { route: "payment", title: "Payment" },
    { route: "forgot-password", title: "forgot-password" },
    { route: "customercreate", title: "customercreate" },
    { route: "usersetting", title: "usersetting" },
    { route: "addpayee", title: "addpayee" },
    { route: "forgot", title: "forgot" },
    { route: "fund", title: "fund" },
    { route: "setpassword", title: "setpassword" },
    { route: "accountstatement", title: "accountstatement" },
    { route: "setnewpassword", title: "setnewpassword" },
    { route: "rtgs", title: "rtgs" },
    { route: "imps", title: "imps" },
  ];

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.user = getLoggedInUser();
    console.log("FEtched user", this.user);
  }
}
