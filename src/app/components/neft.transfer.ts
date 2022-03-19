import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser } from "../utis";
import { User } from "../model/User";

@Component({
  selector: "neft-transfer",
  template: `
    <form  [formGroup]="neftForm" (submit)="handleSubmit($event)">
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate NEFT Payment</h3>
        </div>

        <tr>
          <td>From Account</td>
          <td><input type="text" name="fromaccountnumber" formControlName="fromaccountnumber"/></td>
        </tr>
        <tr>
          <td>To Account</td>
          <td><input type="text" name="accountNumber" formControlName="accountNumber"/></td>
        </tr>
        <tr>
          <td>Amount</td>
          <td><input type="text" name="amount" formControlName="amount"/></td>
        </tr>
        <tr>
          <td>Transaction Date</td>
          <td><input type="date" name="transactiondate" formControlName="transactiondate"/></td>
        </tr>
        <tr>
          <td>Remark</td>
          <td><input type="text" name="remarks" formControlName="remarks"/></td>
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
        <button type="submit" class="btn btn-primary btn-lg">Continue</button>
        </tr>
      </table>
    </form>
  `,
})
export class NeftComponent implements OnInit {
  public neftForm: FormGroup;
  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.neftForm = this.fb.group({
      fromaccountnumber: [null, Validators.required],
      accountNumber: [null, Validators.required],
      amount: [null, Validators.required],
      transactiondate: [null, Validators.required],
      remarks: [null, Validators.required],
    });
  }


  ngOnInit() {}

  async handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.registerForm.value to the API
    const user: any = await getLoggedInUser().toPromise();

    console.log('user ', user.id)
    console.log('neftForm ', this.neftForm.value)

    this.neftForm.patchValue({
      userId: user.id, 
      fundMode:"Neft",
    });

    this.httpClient
      .post("/v2/addFund", this.neftForm.value)
      .subscribe((resp: any) => {
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
}
