import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IUser } from "../model/User";
import { getLoggedInUser } from "../utis";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  public statements: any = [];
  public users: any = [];
  public user?: IUser;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // Send the this.registerForm.value to the API
    this.user = getLoggedInUser();
    this.httpClient
      .get(`/v2/accounthistory?userId=${this.user?.userid}`)
      .subscribe((resp: any) => {
        if (resp) {
          console.log(resp)
          this.statements = resp.accountList;
          this.users = resp.userList;
        }
      });
  }
}
