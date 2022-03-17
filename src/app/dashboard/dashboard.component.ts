import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public sideNavs = [
    {
      route: "account",
      icon: "fa fa-home",
      text: "Home",
    },
    {
      route: "addpayee",
      icon: "fa fa-tasks",
      text: "Add Beneficery",
    },
    {
      route: "payment",
      icon: "fa fa-tasks",
      text: "Funds Transfer",
    },
    {
      route: "accountstatement",
      icon: "fa fa-bar-chart",
      text: "Account Statement",
    },
    {
      route: "usersetting",
      icon: "fa fa-user",
      text: "Account Details",
    },
    {
      route: "setnewpassword",
      icon: "fa fa-cog",
      text: "Setting",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
