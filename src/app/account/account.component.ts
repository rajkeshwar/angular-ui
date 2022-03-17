import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public statements: any = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('/api/customers?_start=0&_limit=10')
      .subscribe(resp => this.statements = resp);
  }

}
