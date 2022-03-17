import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup

  constructor(private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
   }

  ngOnInit(): void {
  }

  handleSubmit(event:Event) {
    event.preventDefault();

    // Send the value this.loginForm.value to the API
    console.log(this.loginForm.value);
  }
}
