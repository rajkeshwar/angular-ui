import { Component, OnInit } from "@angular/core";

@Component({
  selector: "neft-transfer",
  template: `
    <form>
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate NEFT Payment</h3>
        </div>

        <tr>
          <td>From Account</td>
          <td><input type="text" name="FromAccount" /></td>
        </tr>
        <tr>
          <td>To Account</td>
          <td><input type="text" name="ToAccount" /></td>
        </tr>
        <tr>
          <td>Amount</td>
          <td><input type="text" name="Amount" /></td>
        </tr>
        <tr>
          <td>Transaction Date</td>
          <td><input type="date" name="Date" /></td>
        </tr>
        <tr>
          <td>Remark</td>
          <td><input type="text" name="Remark" /></td>
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
          <td><input type="submit" class="btn btn-primary mt-4" value="Continue" /></td>
        </tr>
      </table>
    </form>
  `,
})
export class NeftComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
