import React, { useContext, useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { UserContext } from '../store/UserContext';
import { getUserIdFromToken, saveUserToken } from '../utils/auth';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const { saveUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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

      const response = await fetch('/api/users/login', {
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
    setFormData({ email: '', password: '' });
    setFormErrors({});
  }

  function validateForm(): FormErrors {
    const errors: FormErrors = {};

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    }

    return errors;
  }

  return (
    <Row className="justify-content-center align-items-center vh-100 vw-100">
      <Col xs={8} md={4}>
        <Form onSubmit={(event) => void handleSubmit(event)} className="mb-3">
          <h1 className="mb-3">Login</h1>
          {errorMessage && (
            <Alert variant="danger" className="mb-3">
              {errorMessage}
            </Alert>
          )}

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

          <Button type="submit" title={isLoading ? 'Loading' : 'Login'} disabled={isLoading} />
        </Form>

        <Link to="/signup">Don&apos;t have an account?</Link>
      </Col>
    </Row>
  );
}
