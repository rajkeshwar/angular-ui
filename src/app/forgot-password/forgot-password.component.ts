import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotpassForm: FormGroup;
  public alert = { type: "success", message: "" };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.forgotpassForm = this.fb.group({
      username: ["", Validators.required],
      otp: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.forgotUserForm.value to the API
    console.log(this.forgotpassForm.value);

    const { username, otp } = this.forgotpassForm.value;
    this.httpClient
      .post("/v2/user/forgotPassword", this.forgotpassForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp && resp.data) {
              this.router.navigate(["/setnewpassword"]);
              setTimeout(() => (this.alert.message = ""), 5000);
        } else {
          this.alert = {
            type: "danger",
            message: `${resp.error}`,
          };
        }
      });
  }

  generateOtp() {
    const { username } = this.forgotpassForm.value;
    this.httpClient
      .get("/v2/user/otp/forgotpass?username=" + username)
      .subscribe((resp: any) => {
        if (resp && resp.error) {
          this.alert = {
            type: "danger",
            message: `${resp.error}`,
          };
          setTimeout(() => (this.alert.message = ""), 5000);
        }
      });
  }

}
