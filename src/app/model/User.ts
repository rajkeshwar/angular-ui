export interface IUser {
  id: number;
  accountNo: string;
  password?: string;
  userName: string;
  name: string;
  balance: number;
}

export class User implements IUser {
  public id: number;
  public accountNo: string;
  public password?: string;
  public userName: string;
  public name: string;
  public balance: number;

  constructor() {
    this.id = 0;
    this.accountNo = "";
    this.password = "";
    this.userName = "";
    this.name = "";
    this.balance = 0;
  }
}
