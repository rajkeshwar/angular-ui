import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  public forgotUserForm: FormGroup;
  public alert = { type: "success", message: "" };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.forgotUserForm = this.fb.group({
      accountNo: ["", Validators.required],
      otp: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.forgotUserForm.value to the API
    console.log(this.forgotUserForm.value);

    const { accountNo, otp } = this.forgotUserForm.value;
    this.httpClient
      .post("/v2/user/forgotUserId", this.forgotUserForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp && resp != null) {
          this.forgotUserForm.reset();
          this.alert = {
            type: "success",
            message: `Your username is : ${resp.username}`,
          };
          setTimeout(() => (this.alert.message = ""), 5000);
        }
      });
  }

  generateOtp() {
    const { accountNo } = this.forgotUserForm.value;
    this.httpClient
      .get("/v2/user/otp?accountNo=" + accountNo)
      .subscribe((resp: any) => {});
  }
}
