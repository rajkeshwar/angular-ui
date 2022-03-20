import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
<<<<<<< HEAD
import { getLoggedInUser } from "../utis";

=======
>>>>>>> 34f8735413b4d3aca7576c0a92554a1a116b24f2
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
