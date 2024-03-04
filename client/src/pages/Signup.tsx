import React, { useContext, useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { UserContext } from '../store/UserContext';
import { getUserIdFromToken, saveUserToken } from '../utils/auth';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Signup() {
  const { saveUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Reset any existing error for this field
    setFormErrors({ ...formErrors, [name]: null });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateForm(); // Call validation function

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent submission if any errors exist
    }

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setErrorMessage('');

        const { token } = (await response.json()) as { token: string };

        saveUserToken(token);

        const userId = getUserIdFromToken(token);
        saveUser(userId);

        navigate('/');
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (e) {
      setErrorMessage('An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }

    // Clear form data and errors
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    setFormErrors({});
  }

  function validateForm(): FormErrors {
    const errors: FormErrors = {};

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
    <Row className="justify-content-center align-items-center vh-100 vw-100">
      <Col xs={8} md={4}>
        <Form onSubmit={(event) => void handleSubmit(event)} className="mb-3">
          <h1 className="mb-3">Signup</h1>
          {errorMessage && (
            <Alert variant="danger" className="mb-3">
              {errorMessage}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!formErrors.firstName}
            />
            <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!formErrors.lastName}
            />
            <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Enter password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!formErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" title={isLoading ? 'Loading' : 'Signup'} disabled={isLoading} />
        </Form>

        <Link to="/login">Already have an account?</Link>
      </Col>
    </Row>
  );
}
