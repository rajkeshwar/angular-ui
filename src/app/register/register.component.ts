import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { hasSame } from "../utis";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
