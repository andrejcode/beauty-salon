import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { getUserRoleFromToken, getUserToken } from '../src/utils/auth.ts';
import { UserProvider } from './context/UserContext.tsx';
import Root from './pages/Root.tsx';
import Error from './pages/Error.tsx';
import Home from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import BookAppointment from './pages/BookAppointment.tsx';
import Appointments from './pages/Appointments.tsx';
import Admin from './pages/Admin.tsx';
import './index.css';

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
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
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
  </React.StrictMode>,
);
