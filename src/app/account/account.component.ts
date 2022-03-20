import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { getLoggedInUser } from "../utis";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  public statements: any = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // Send the this.registerForm.value to the API
    const user: any = getLoggedInUser();
    this.httpClient
      .get(`/v2/accounthistory?userId=${user.id}`)
      .subscribe((resp) => (this.statements = resp));
  }
}
