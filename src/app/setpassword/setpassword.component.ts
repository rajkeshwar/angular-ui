import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {

  public setnewpassForm: FormGroup;
  public alert = { type: "success", message: "" };

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.setnewpassForm = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])),
      repassword: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();

    // Send the value this.forgotUserForm.value to the API
    console.log(this.setnewpassForm.value);

    const { username, password, repassword } = this.setnewpassForm.value;
    var data = localStorage.getItem("user");
    var userid="";
    if(data != null){
      userid = JSON.parse(data).userid;
    }
    this.setnewpassForm.patchValue({
      userId: userid, 
    });
    this.httpClient
      .post("/v2/user/setNewPassword", this.setnewpassForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp && resp != null) {
              setTimeout(() => (this.alert.message = ""), 5000);
        } else {
          this.alert = {
            type: "danger",
            message: "Invalid Username ",
          };
        }
      });
  }

  get isInvlid() {
    const { password, repassword } =
      this.setnewpassForm.value;
    return (
      this.setnewpassForm.invalid ||
      password !== repassword
    );
  }

}
