import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { getLoggedInUser } from "src/app/utis";

@Injectable({ providedIn: "root" })
export class UserService {
  private storageSub = new Subject<String>();

  watchUser(): Observable<any> {
    return this.storageSub.asObservable();
  }

  storeUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    this.storageSub.next(getLoggedInUser());
  }

  removeUser() {
    localStorage.removeItem('user');
    this.storageSub.next(getLoggedInUser());
  }
}
