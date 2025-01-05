import { ChangeEvent, FormEvent, FocusEvent, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { validateAuthFormField } from '@/utils/auth';
import type {
  LoginFormData,
  SignupFormData,
  FormData,
  FormErrors,
} from '@/types';

const initialLoginFormData: LoginFormData = {
  email: '',
  password: '',
};

const initialSignupFormData: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function useAuthForm(isLogin: boolean) {
  const { isLoading, errorMessage, authenticate } = useAuth();

  const [formData, setFormData] = useState<FormData>(
    isLogin ? initialLoginFormData : initialSignupFormData,
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    setFormErrors(prevErrors => ({ ...prevErrors, [name]: null }));
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldError = validateAuthFormField(name, value, formData, isLogin);

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(fieldName => {
      const error = validateAuthFormField(
        fieldName,
        formData[fieldName],
        formData,
        isLogin,
      );
      if (error) {
        errors[fieldName] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const endpoint = isLogin ? '/api/users/login' : '/api/users/signup';
    await authenticate(endpoint, formData);

    setFormData(isLogin ? initialLoginFormData : initialSignupFormData);
    setFormErrors({});
  };

  return {
    isLoading,
    errorMessage,
    formData,
    formErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
