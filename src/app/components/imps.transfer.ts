import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUser } from "../utis";

@Component({
  selector: "imps-transfer",
  template: `
  <form [formGroup]="impsForm" (submit)="handleSubmit($event)">
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate IMPS Payment</h3>
          <br />
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
          <td><input type="text" name="remarks" formControlName="remarks" /></td>
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
export class ImpsComponent implements OnInit {

  public impsForm: FormGroup;
  public alert = {
    type: "success",
    message: "",
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.impsForm = this.fb.group({
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
     console.log('impsForm ', this.impsForm.value)

    this.impsForm.patchValue({
      userId: user.id, 
      fundMode: 'Imps',
    });

    this.httpClient
      .post("/v2/addFund", this.impsForm.value)
      .subscribe((resp: any) => {
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
