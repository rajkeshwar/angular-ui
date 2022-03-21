import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser, originalOrder, trackByFn } from "../utis";

@Component({
  selector: "imps-transfer",
  template: `
    <form [formGroup]="impsForm" (submit)="handleSubmit($event)">
    <div class="d-flex justify-content-center mt-2" *ngIf="alert.message">
        <ngb-alert [type]="alert.type" class="d-block">{{ alert.message }}</ngb-alert>
      </div>
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate IMPS Payment</h3>
          <br />
        </div>
        <tr *ngFor="let field of impsForm.value | keyvalue: preserveOrder; trackBy: trackByFn">
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
          <button type="submit" class="btn btn-primary btn-lg" [disabled]="impsForm.invalid">Continue</button>
        </tr>
      </table>
    </form>
  `,
})
export class ImpsComponent {
  public impsForm: FormGroup;
  public preserveOrder = originalOrder;
  public trackByFn = trackByFn;

  public alert = {
    type: "success",
    message: "",
  };
  public user: any = getLoggedInUser();
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.impsForm = this.fb.group({
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

  async handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.registerForm.value to the API
    const user: any = getLoggedInUser();

    const body = { ...this.impsForm.value, userId: user.userid, fundMode: "Imps", fromaccountnumber:user.accountNo };

    this.httpClient.post("/v2/addFund", body).subscribe((resp: any) => {
      if (resp && resp != null) {
        this.impsForm.reset();
        this.alert = {
          type: "success",
          message: "Fund added successefully",
        };
        setTimeout(() => (this.alert.message = ""), 5000);
      }
    });
  }
  get isInvlid() {
    const { accountNumber,fromAccountNumber } = this.impsForm.value;
    return this.impsForm.invalid || accountNumber === fromAccountNumber;
  }


  isDisabled(field: any) {
    return ["fromAccountNumber"].includes(field.key) ? true : null;
  }
}
