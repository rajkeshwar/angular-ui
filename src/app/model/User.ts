export interface IUser {
  id: number;
  accountNo: string;
  password?: string;
  userName: string;
  name: string;
  accountBalance: number;
  userid:number;
}

export class User implements IUser {
  public id: number;
  public accountNo: string;
  public password?: string;
  public userName: string;
  public name: string;
  public accountBalance: number;
  public userid: number;

  constructor() {
    this.id = 0;
    this.accountNo = "";
    this.password = "";
    this.userName = "";
    this.name = "";
    this.accountBalance = 0;
    this.userid =0;
  }
}
