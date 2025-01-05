export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export type FormData = SignupFormData | LoginFormData;
export type FormErrors = Partial<SignupFormData>;
