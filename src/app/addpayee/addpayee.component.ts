import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser } from "../utis";

@Component({
  selector: "app-addpayee",
  templateUrl: "./addpayee.component.html",
  styleUrls: ["./addpayee.component.scss"],
})
export class AddpayeeComponent implements OnInit {
  public addPayeeForm: FormGroup;
  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.addPayeeForm = this.fb.group({
      beneficeryName: [null, Validators.required],
      accountNo: [null, Validators.required],
      reaccountNo: [null, Validators.required],
      nickName: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    const user: any = await getLoggedInUser().toPromise();

    console.log("userId ", user.userid);
    console.log("addPayeeForm ", this.addPayeeForm.value);

    const body = { ...this.addPayeeForm.value, userId: user.userid };
    

    this.httpClient.post("/v2/addPayee", body).subscribe((resp: any) => {
      if (resp && resp != null) {
        this.addPayeeForm.reset();
        this.alert = {
          type: "success",
          message: "Beneficiary added successefully",
        };
        setTimeout(() => (this.alert.message = ""), 5000);
      } else {
        this.alert = {
          type: "danger",
          message: "Account Number already exists",
        };
      }
    });
  }

  get isInvlid() {
    const { accountNo, reaccountNo } = this.addPayeeForm.value;
    return this.addPayeeForm.invalid || accountNo !== reaccountNo;
  }
}
