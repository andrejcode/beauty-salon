export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export type LoginFormErrors = Partial<LoginFormData>;
export type SignupFormErrors = Partial<SignupFormData>;
