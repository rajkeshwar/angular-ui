import { KeyValue } from "@angular/common";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { User } from "./model/User";

export const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const pass = group.get("password")?.value;
  const confirmPass = group.get("rePassword")?.value;
  return pass === confirmPass ? null : { notSame: true };
};

export const hasSame = (input: string, reInput: string) => {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get(input)?.value;
    const confirmPass = group.get(reInput)?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
};

export const getLoggedInUser = (): Observable<User | null> => {
  try {
    const userString: any = localStorage.getItem("user");
    return of(JSON.parse(userString));
  } catch (ex) {
    return of(null);
  }
};

export const originalOrder = (
  a: KeyValue<number, string>,
  b: KeyValue<number, string>
): number => {
  return 0;
};

export const trackByFn = (index: number) => index;
