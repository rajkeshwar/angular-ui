import { Component, OnInit } from "@angular/core";

@Component({
  selector: "imps-transfer",
  template: `
    <form>
      <table cellspacing="7" cellpadding="8 " align="center" bgcolor="white">
        <div align="center">
          <h3>Initiate IMPS Payment</h3>
          <br />
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

      <table align="center">
        <tr>
          <td><input type="submit" class="btn btn-primary mt-4" value="Continue" /></td>
        </tr>
      </table>
    </form>
  `,
})
export class ImpsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
