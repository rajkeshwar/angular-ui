import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser, originalOrder, trackByFn } from "../utis";

@Component({
  selector: "imps-transfer",
  template: `
    <form [formGroup]="impsForm" (submit)="handleSubmit($event)">
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate IMPS Payment</h3>
          <br />
        </div>
        <tr *ngFor="let field of impsForm.value | keyvalue: preserveOrder; trackBy: trackByFn">
          <td>{{ field.key | heading }}</td>
          <td>
            <input
              [type]="getInputType(field)"
              [name]="field.key"
              [formControlName]="getFormKey(field)"
            />
          </td>
        </tr>
      </table>

      <table align="center">
        <tr>
          <button type="submit" class="btn btn-primary btn-lg">Continue</button>
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

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.impsForm = this.fb.group({
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

    console.log("user ", user.id);

    const body = { ...this.impsForm.value, userId: user.id, fundMode: "Imps" };
    console.log("impsForm body ", body);

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
}
