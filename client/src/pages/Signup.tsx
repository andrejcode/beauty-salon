import { ChangeEvent, FormEvent, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { SignupFormData, SignupFormErrors } from '../types';
import AuthForm from '../components/AuthForm';

const initialFormData: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Signup() {
  const { isLoading, errorMessage, authenticate } = useAuth();

  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});

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

    await authenticate('/api/users/signup', formData);

    // Clear form data and errors
    setFormData(initialFormData);
    setFormErrors({});
  }

  function validateForm(): SignupFormErrors {
    const errors: SignupFormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }
    if (formData.firstName.length > 30 || formData.lastName.length > 30) {
      errors.firstName = 'Name cannot be longer than 30 letters.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    }
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain an uppercase letter.';
    }
    if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must contain a lowercase letter.';
    }
    if (!/\d/.test(formData.password)) {
      errors.password = 'Password must contain a number.';
    }
    if (!formData.confirmPassword.trim() || formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords does not match.';
    }

    return errors;
  }

  return (
    <AuthForm
      isLogin={false}
      isLoading={isLoading}
      errorMessage={errorMessage}
      formData={formData}
      formErrors={formErrors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
