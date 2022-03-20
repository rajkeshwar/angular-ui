import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser, originalOrder, trackByFn } from "../utis";

@Component({
  selector: "neft-transfer",
  template: `
    <form [formGroup]="neftForm" (submit)="handleSubmit($event)">
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate NEFT Payment</h3>
        </div>

        <tr *ngFor="let field of neftForm.value | keyvalue: preserveOrder; trackBy: trackByFn">
          <td>{{ field.key | heading }}</td>
          <td>
            <input
              [type]="getInputType(field)"
              [name]="field.key"
              [formControlName]="field.key"
            />
          </td>
        </tr>
      </table>

      <div>
        <strong>Please note:</strong><br />
        <strong
          >1. Transactions will be executed on the next working day if they are
          scheduled for Sundays,National Holidays,NEFT Holidays (as declared by
          RBI).</strong
        ><br />
        <strong
          >2.Timings for NEFT: Monday-Saturday(except 2nd and 4th Saurday)6:00
          AM - 6:30 PM</strong
        >
      </div>

      <table align="center">
        <tr>
        <button type="submit" class="btn btn-primary btn-lg" >Continue</button>
        </tr>
      </table>
    </form>
  `,
})
export class NeftComponent {
  public neftForm: FormGroup;  
  public preserveOrder = originalOrder;
  public trackByFn = trackByFn;

  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.neftForm = this.fb.group({
      fromAccount: [null, Validators.required],
      toAccount: [null, Validators.required],
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

    const body = { ...this.neftForm.value, userId: user.userid, fundMode: "Neft", fromaccountnumber:user.accountNo };

    this.httpClient.post("/v2/addFund", body).subscribe((resp: any) => {
      if (resp && resp != null) {
        this.neftForm.reset();
        this.alert = {
          type: "success",
          message: "Fund added successefully",
        };
        setTimeout(() => (this.alert.message = ""), 5000);
      }
    });
  }

  get isInvlid() {
    const { accountNumber } = this.neftForm.value;
    return this.neftForm.invalid || accountNumber !== null;
  }
}
