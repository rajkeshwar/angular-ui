import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-addpayee',
  templateUrl: './addpayee.component.html',
  styleUrls: ['./addpayee.component.scss']
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

  handleSubmit(event: Event) {
    event.preventDefault();
    var data = localStorage.getItem("user");
    var userid="";
    if(data != null){
      userid = JSON.parse(data).userid;
    }
    this.addPayeeForm.patchValue({
      userId: userid, 
    });
    console.log(userid);
    console.log(this.addPayeeForm.value);
    this.httpClient
      .post("/v2/addPayee", this.addPayeeForm.value)
      .subscribe((resp: any) => {
        if (resp && resp != null) {
          this.addPayeeForm.reset();
          this.alert = {
            type: "success",
            message: "Beneficiary added successefully",
          };
          setTimeout(() => (this.alert.message = ""), 5000);
        }else {
          this.alert = {
            type: "danger",
            message: "Account Number already exists",
          };
        }
      });
  }

  get isInvlid() {
    const { accountNo, reaccountNo } =
      this.addPayeeForm.value;
    return (
      this.addPayeeForm.invalid ||
      accountNo !== reaccountNo 
    );
  }
}
