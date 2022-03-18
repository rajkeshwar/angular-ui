import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  studentDetails = null as any;
  studentToUpdate = {
    rollNumber:"",
    name:"",
    address:"",
    percentage:""
  }

  edit(studuent: any){
    this.studentToUpdate = studuent;
  }

  public statements: any = [];

  constructor(private httpClient:HttpClient) { }
  API = 'http://localhost:9090';
  ngOnInit(): void {
    this.httpClient.get('/v2/user/admin/list')
      .subscribe(resp => this.statements = resp);
  }

  updateStudent(){
  }

  public deleteStudent(id: any) {
    return this.httpClient.delete(this.API + '/deleteStudent?id=' + id);
  }

  public updateStudents(student: any) {
    return this.httpClient.put(this.API + '/updateStudents', student);
  }

}
