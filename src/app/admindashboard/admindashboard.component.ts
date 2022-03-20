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
    username: "",
    approved: "",
  };

  public customers: any = [];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.httpClient
      .get("/v2/user/admin/list")
      .subscribe((resp) => (this.customers = resp));
  }

  save(updateUser: any) {
    // Call API and udpateUser
    console.log("Save updateUser : ", updateUser);
    this.httpClient
      .post("/v2/user/update",updateUser)
      .subscribe((resp:any) => {
        if (resp && resp != null) {
          this.customers =resp;
        } 
      });
  }

  delete(deleteUser: any) {
    // CAll an API to delete User
    this.httpClient
      .delete("/v2/user/delete?id="+deleteUser.userid)
      .subscribe((resp:any) => {console.log("Delete ", resp);
          this.getStudentsDetails();
      });
  }

  getStudentsDetails() {
    this.httpClient
    .get("/v2/user/admin/list")
    .subscribe((resp) => (this.customers = resp));
  }

  async open(content: any, student: any) {
    await this.modalService.open(content);
    console.log("Edit ", student);
    this.updateUser = student;
  }
}
