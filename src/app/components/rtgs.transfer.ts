import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser, originalOrder, trackByFn } from "../utis";

@Component({
  selector: "rtgs-transfer",
  template: `
    <form [formGroup]="rtgsForm" (submit)="handleSubmit($event)">
    <div class="d-flex justify-content-center mt-2" *ngIf="alert.message">
        <ngb-alert [type]="alert.type" class="d-block">{{ alert.message }}</ngb-alert>
      </div>
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate RTGS Payment</h3>
        </div>

        <tr *ngFor="let field of rtgsForm.value | keyvalue: preserveOrder; trackBy: trackByFn">
          <td>{{ field.key | heading }}</td>
          <td>
            <input
              [attr.disabled]="isDisabled(field)"
              [type]="getInputType(field)"
              [name]="field.key"
              [formControlName]="getFormKey(field)"
            />
          </td>
        </tr>
      </table>

      <table align="center">
        <tr>
          <td>
            <input
              type="submit" [disabled]="rtgsForm.invalid"
              class="btn btn-primary mt-4"
              value="Continue"
            />
          </td>
        </tr>
      </table>
    </form>
  `,
})
export class RtgsComponent implements OnInit {
  public rtgsForm: FormGroup;
  public preserveOrder = originalOrder;
  public trackByFn = trackByFn;

  public alert = {
    type: "success",
    message: "",
  };
  public user: any = getLoggedInUser();
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.rtgsForm = this.fb.group({
      fromAccountNumber: [this.user.accountNo, Validators.required],
      accountNumber: [null, Validators.required],
      amount: [null, Validators.required],
      transactionDate: [null, Validators.required],
      remarks: [null, Validators.required],
    });
  }

  getFormKey(field: any) {
    return field.key;
  }

  getInputType(field: any) {
    return /Date/i.test(field.key) ? "date" : "text";
  }

  ngOnInit() {}

  async handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.registerForm.value to the API
    const user: any = getLoggedInUser();


    console.log('user ', user.userid)
    
    const body = { ...this.rtgsForm.value, userId: user.userid, fundMode: 'Rtgs', fromaccountnumber:user.accountNo };
    console.log('rtgsForm body ', body)

    this.httpClient.post("/v2/addFund", body).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.rtgsForm.reset();
        this.alert = {
          type: "success",
          message: "Fund added successefully",
        };
        setTimeout(() => (this.alert.message = ""), 5000);
      }else {
        this.alert = {
          type: "danger",
          message: `${resp.error}`,
        };
      }
    });
  }

  get isInvlid() {
    const { accountNumber,fromAccountNumber } = this.rtgsForm.value;
    return this.rtgsForm.invalid || accountNumber === fromAccountNumber;
  }


  isDisabled(field: any) {
    return ["fromAccountNumber"].includes(field.key) ? true : null;
  }
}
