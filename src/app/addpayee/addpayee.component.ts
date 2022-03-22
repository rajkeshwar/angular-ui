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
    var data = localStorage.getItem("user");
    var userId="";
    if(data != null){
      userId = JSON.parse(data).userid;
    }

    const body = { ...this.addPayeeForm.value, userId: userId };
    

    this.httpClient.post("/v2/addPayee", body).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.addPayeeForm.reset();
        this.alert = {
          type: "success",
          message: "Beneficiary added successefully",
        };
        setTimeout(() => (this.alert.message = ""), 5000);
      } else {
        this.alert = {
          type: "danger",
          message: `${resp.error}`,
        };
      }
    });
  }

  get isInvlid() {
    const { accountNo, reaccountNo } = this.addPayeeForm.value;
    return this.addPayeeForm.invalid || accountNo !== reaccountNo;
  }
}
