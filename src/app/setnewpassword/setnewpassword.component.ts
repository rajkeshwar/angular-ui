import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.scss']
})
export class SetnewpasswordComponent implements OnInit {

  public setnewpassForm: FormGroup;
  public alert = { type: "success", message: "" };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.setnewpassForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      repassword: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.forgotUserForm.value to the API
    console.log(this.setnewpassForm.value);

    const { username, password, repassword } = this.setnewpassForm.value;
    this.httpClient
      .post("/v2/user/setNewPassword", this.setnewpassForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp && resp != null) {
              this.router.navigate(["/login"]);
              setTimeout(() => (this.alert.message = ""), 5000);
        } else {
          this.alert = {
            type: "danger",
            message: "Invalid Username ",
          };
        }
      });
  }

  get isInvlid() {
    const { password, repassword } =
      this.setnewpassForm.value;
    return (
      this.setnewpassForm.invalid ||
      password !== repassword
    );
  }

}
