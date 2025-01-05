import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
import Nav from '../Nav';

describe('Nav Component', () => {
  it('should show Login link when user is not logged in', () => {
    const mockContextValue = {
      userId: null,
      isAdmin: false,
      loading: true,
      removeUser: vi.fn(),
      saveUser: vi.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();

    const logoutLink = screen.queryByText(/Logout/i);
    expect(logoutLink).not.toBeInTheDocument();
  });

  it('should show Logout link when user is logged in', () => {
    const mockContextValue = {
      userId: 1,
      isAdmin: false,
      loading: true,
      removeUser: vi.fn(),
      saveUser: vi.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    const logoutLink = screen.getByText(/Logout/i);
    expect(logoutLink).toBeInTheDocument();

    const loginLink = screen.queryByText(/Login/i);
    expect(loginLink).not.toBeInTheDocument();
  });

  it('should show Admin link when user is an admin', () => {
    const mockContextValue = {
      userId: 1,
      isAdmin: true,
      loading: true,
      removeUser: vi.fn(),
      saveUser: vi.fn(),
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    const adminLink = screen.getByText(/Admin/i);
    expect(adminLink).toBeInTheDocument();

    const logoutLink = screen.getByText(/Logout/i);
    expect(logoutLink).toBeInTheDocument();

    const loginLink = screen.queryByText(/Login/i);
    expect(loginLink).not.toBeInTheDocument();
  });
});
