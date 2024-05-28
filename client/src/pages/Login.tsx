import { useState, ChangeEvent, FormEvent } from 'react';
import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';
import { LoginFormData, LoginFormErrors } from '../types';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export default function Login() {
  const { isLoading, errorMessage, authenticate } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Reset any existing error for this field
    setFormErrors({ ...formErrors, [name]: null });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateForm(); // Call validation function

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent submission if any errors exist
    }

    await authenticate('/api/users/login', formData);

    // Clear form data and errors
    setFormData(initialFormData);
    setFormErrors({});
  }

  function validateForm(): LoginFormErrors {
    const errors: LoginFormErrors = {};

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    }

    return errors;
  }

  return (
    <AuthForm
      isLogin={true}
      isLoading={isLoading}
      errorMessage={errorMessage}
      formData={formData}
      formErrors={formErrors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
