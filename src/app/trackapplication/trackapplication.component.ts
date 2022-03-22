import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-trackapplication',
  templateUrl: './trackapplication.component.html',
  styleUrls: ['./trackapplication.component.scss']
})
export class TrackapplicationComponent implements OnInit {
  public trackForm: FormGroup;
  public alert = { type: "success", message: "" };
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.trackForm = this.fb.group({
      referenceNo: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.forgotUserForm.value to the API
    console.log(this.trackForm.value.referenceNo);

    const referenceNo = this.trackForm.value.referenceNo;
    this.httpClient
      .get('/v2/user/track?referenceNo='+referenceNo)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp && resp.error) {
          this.trackForm.reset();
          this.alert = {
            type: "success",
            message: `${resp.error}`,
          };  
          setTimeout(() => (this.alert.message = ""), 5000);
        } 
      });
  }

}
