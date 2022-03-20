import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public alert = { type: "success", message: "" };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.loginForm.value to the API
    console.log(this.loginForm.value);
    // Remove this line once you integrate with actual API.
    const { username, password } = this.loginForm.value;

    this.httpClient
      // Only for testing with mock-server. Can be removed once v2 is working
      .get(`/api/users?userName=${username}&password=${password}`)
      // .post("/v2/user/login", this.loginForm.value)
      .subscribe((resp: any) => {
        if (resp && resp != null) {
          // Store here your own user object. In mock-server I receive as array. So storing index=0
          this.userService.storeUser(resp[0]);
          if (resp.roleName == "Admin") {
            this.router.navigate(["/admindashboard"]);
          } else {
            this.router.navigate(["/dashboard"]);
          }
        } else {
          this.alert = {
            type: "danger",
            message: "Invalid username or password",
          };
        }
      });
  }
}
