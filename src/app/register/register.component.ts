import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.registerForm = this.fb.group({
      accountNo: [null, Validators.required],
      password: [null, Validators.required],
      rePassword: [null, Validators.required],
      txnPassword: [null, Validators.required],
      confTxnPassword: [null, Validators.required],
      otp: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.registerForm.value to the API
    console.log(this.registerForm.value);

    this.httpClient
      .post("/v2/user/register", this.registerForm.value)
      .subscribe((resp: any) => {
        if (resp && resp != null) {
          this.registerForm.reset();
          this.alert = {
            type: "success",
            message: "Register success. Please login",
          };
          setTimeout(() => (this.alert.message = ""), 5000);
        }
      });
  }

  get isInvlid() {
    const { password, rePassword, txnPassword, confTxnPassword } =
      this.registerForm.value;
    return (
      this.registerForm.invalid ||
      password !== rePassword ||
      txnPassword !== confTxnPassword
    );
  }
}
