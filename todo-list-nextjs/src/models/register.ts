import { genderStatus } from "./genderStatus";

export type AuthType = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string | number;
  confirmPassword?: string | number;
  gender?: genderStatus;
}