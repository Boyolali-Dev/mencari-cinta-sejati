import { genderStatus } from "./genderStatus";

export type RegisterType = {
username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
  gender: genderStatus;
}