import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.scss']
})
export class AccountstatementComponent implements OnInit {

  public accForm: FormGroup;
  public statements: any = [];
  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.accForm = this.fb.group({
      fromdate: [null, Validators.required],
      todate: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.registerForm.value to the API
    var data = localStorage.getItem("user");
    console.log(data);
    var userId="";
    if(data != null){
      userId = JSON.parse(data).userid;
    }
    const body = { ...this.accForm.value, userId: userId};

    this.httpClient
      .post("/v2/accounthistory",body)
      .subscribe(resp => this.statements = resp);
  }

  get isInvlid() {
    const { fromdate, todate } =
      this.accForm.value;
    return (
      this.accForm.invalid ||
      fromdate !== null ||
      todate !== null
    );
  }

}
