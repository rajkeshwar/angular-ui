import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-customercreate",
  templateUrl: "./customercreate.component.html",
  styleUrls: ["./customercreate.component.scss"],
})
export class CustomercreateComponent implements OnInit {
  public form: FormGroup;
  public alert = { type: "error", message: "" };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      fathersName: ["", Validators.required],
      gender: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      pincode: ["", Validators.required],
      dob: ["", Validators.required],
      debitCard: ["", Validators.required],
      netbanking: ["", Validators.required],
      termsAndConditions: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the this.form.value to the API
    console.log("Submit called", this.form.value);

    this.httpClient
      .post("/api/createCustomers", this.form.value)
      .subscribe((resp: any) => {
        if (resp && resp.id) {
          this.form.reset();
          this.alert = {
            type: "success",
            message: `Customer created successfully with id ${resp.id}`,
          };
        }
      });
  }
}
