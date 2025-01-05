import { Link } from 'react-router-dom';
import FormGroup from './ui/FormGroup';
import Logo from './Logo';
import LoadingSpinner from './ui/LoadingSpinner';
import Alert from './ui/Alert';
import Button from './ui/Button';
import useAuthForm from '@/hooks/useAuthForm';
import { type SignupFormData } from '@/types';

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { isLoading, errorMessage, formData, formErrors, handleChange, handleBlur, handleSubmit } =
    useAuthForm(isLogin);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <Logo />
        <form onSubmit={event => void handleSubmit(event)} className="my-6">
          <h1 className="mb-2 text-2xl font-semibold">{isLogin ? 'Login' : 'Signup'}</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          {!isLogin && (
            <>
              <FormGroup
                label="First name"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                fieldValue={(formData as SignupFormData).firstName}
                fieldError={formErrors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormGroup
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                fieldValue={(formData as SignupFormData).lastName}
                fieldError={formErrors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </>
          )}

          <FormGroup
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            fieldValue={formData.email}
            fieldError={formErrors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormGroup
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            fieldValue={formData.password}
            fieldError={formErrors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {!isLogin && (
            <FormGroup
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              fieldValue={(formData as SignupFormData).confirmPassword}
              fieldError={formErrors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size={24} /> : isLogin ? 'Login' : 'Signup'}
          </Button>
        </form>

        {isLogin ? (
          <Link to="/signup" className="text-black underline hover:underline">
            Don&apos;t have an account?
          </Link>
        ) : (
          <Link to="/login" className="text-black underline hover:underline">
            Already have an account?
          </Link>
        )}
      </div>
    </div>
  );
}
