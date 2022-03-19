import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.scss']
})

export class UsersettingComponent implements OnInit {
  public statements: any = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    var data = localStorage.getItem("user");
    var userid="";
    if(data != null){
      userid = JSON.parse(data).userid;
    }
    this.httpClient.get('/v2/user/getList?id='+userid)
      .subscribe(resp => this.statements = resp);
  }
}
