import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss"],
})
export class AdmindashboardComponent implements OnInit {
  public studentDetails = null as any;
  public updateUser = {
    accountNo: "",
    customerId: "",
  };

  public customers: any = [];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}
  // Don't hardcode the base URL here. Configure in proxy.conf.json file.
  // In this way it would be configurable.
  API = "http://localhost:7070";

  ngOnInit(): void {
    this.httpClient
      // .get("/v2/user/admin/list")
      .get(`/api/customers?_start=0&_limit=10`)
      .subscribe((resp) => (this.customers = resp));
  }

  updateStudent() {}

  public deleteStudent(id: any) {
    return this.httpClient.delete(this.API + "/deleteStudent?id=" + id);
  }

  public updateStudents(student: any) {
    return this.httpClient.put(this.API + "/updateStudents", student);
  }

  save(updateUser: any) {
    // Call API and udpateUser
    console.log("Save updateUser : ", updateUser);
  }

  delete(deleteUser: any) {
    // CAll an API to delete User
    console.log("Delete ", deleteUser);
  }

  async open(content: any, student: any) {
    await this.modalService.open(content);

    // Populate this values in the edit form
    console.log("Edit ", student);
    this.updateUser = student;
  }
}
