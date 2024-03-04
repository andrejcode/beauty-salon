import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { getUserRoleFromToken, getUserToken } from '../src/utils/auth.ts';
import { UserProvider } from './store/UserContext.tsx';
import App from './App.tsx';
import Error from './pages/Error.tsx';
import Home from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import BookAppointment from './pages/BookAppointment.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Profile from './pages/Profile.tsx';
import Appointments from './pages/Appointments.tsx';
import Admin from './pages/Admin.tsx';
import Reviews from './pages/Reviews.tsx';

function authLoader() {
  const token = getUserToken();

  if (token) {
    return redirect('/');
  }

  return null;
}

function adminLoader() {
  const token = getUserToken();

  if (token) {
    const role = getUserRoleFromToken(token);

    if (role === 'admin') {
      return null;
    }
  }

  return redirect('/');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/reviews',
        element: <Reviews />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/appointments',
        element: (
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        ),
      },
      {
        path: '/book-appointment',
        element: (
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: <Admin />,
        loader: adminLoader,
      },
    ],
  },
  { path: '/signup', element: <Signup />, loader: authLoader },
  { path: '/login', element: <Login />, loader: authLoader },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
