import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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
