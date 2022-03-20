import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public statements: any = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    var data = localStorage.getItem("user");
    var userid="";
    if(data != null){
      userid = JSON.parse(data).userid;
    }
    this.httpClient.get('/v2/accounthistory?userId='+userid)
      .subscribe(resp => this.statements = resp);
  }

}
