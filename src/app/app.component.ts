import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { IUser, User } from "./model/User";
import { UserService } from "./services/user.service";
import { getLoggedInUser } from "./utis";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  public user?: IUser = getLoggedInUser();
  today: number = Date.now();
  
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
    { route : "loginattemptpassword", title:"loginattemptpassword"},
    { route: "rtgs", title: "rtgs" },
    { route: "imps", title: "imps" },
    { route: "admindashboard", title: "imps" },
    { route: "trackapplication", title: "trackapplication"},
  ];

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.watchUser().subscribe((resp) => {
      console.log("user : ", resp);
      this.user = resp;
    });
  }

  handleLogout() {
    localStorage.clear();
    this.user = new User();
    this.userService.removeUser();
    this.router.navigate(["/login"]);
  }
}
