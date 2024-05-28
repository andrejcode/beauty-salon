import { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from './Button';
import { LoginFormData, LoginFormErrors, SignupFormData, SignupFormErrors } from '../types';

interface AuthFormProps {
  isLogin: boolean;
  isLoading: boolean;
  errorMessage: string;
  formData: LoginFormData | SignupFormData;
  formErrors: LoginFormErrors | SignupFormErrors;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthForm({
  isLogin,
  isLoading,
  errorMessage,
  formData,
  formErrors,
  handleSubmit,
  handleChange,
}: AuthFormProps) {
  return (
    <Row className="justify-content-center align-items-center vh-100 vw-100">
      <Col xs={8} md={4}>
        <Form onSubmit={(event) => void handleSubmit(event)} className="mb-3">
          <h1 className="mb-3">{isLogin ? 'Login' : 'Signup'}</h1>
          {errorMessage && (
            <Alert variant="danger" className="mb-3">
              {errorMessage}
            </Alert>
          )}

          {!isLogin && (
            <>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={(formData as SignupFormData).firstName}
                  onChange={handleChange}
                  isInvalid={!!(formErrors as SignupFormErrors).firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {(formErrors as SignupFormErrors).firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={(formData as SignupFormData).lastName}
                  onChange={handleChange}
                  isInvalid={!!(formErrors as SignupFormErrors).lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {(formErrors as SignupFormErrors).lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </>
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

          {!isLogin && (
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Enter password again"
                value={(formData as SignupFormData).confirmPassword}
                onChange={handleChange}
                isInvalid={!!(formErrors as SignupFormErrors).confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {(formErrors as SignupFormErrors).confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button
            type="submit"
            title={isLoading ? 'Loading' : isLoading ? 'Login' : 'Signup'}
            disabled={isLoading}
          />
        </Form>

        {isLogin ? (
          <Link to="/signup">Don&apos;t have an account?</Link>
        ) : (
          <Link to="/login">Already have an account?</Link>
        )}
      </Col>
    </Row>
  );
}
