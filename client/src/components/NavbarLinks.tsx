import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { FaRegUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { removeUserToken } from '../utils/auth';

export default function NabvarLinks() {
  const { userId, isAdmin, removeUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isAdmin && (
            <LinkContainer to="/admin">
              <Nav.Link>Admin</Nav.Link>
            </LinkContainer>
          )}

          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/reviews">
            <Nav.Link>Reviews</Nav.Link>
          </LinkContainer>

          {userId ? (
            <NavDropdown
              title={<FaRegUserCircle size={'1.5em'} />}
              id="basic-nav-dropdown"
              align="end"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/appointments">
                <NavDropdown.Item>Appointments</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  removeUserToken();
                  removeUser();
                  navigate('/');
                }}
              >
                Logout <FaSignOutAlt />
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                Login <FaSignInAlt />
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </>
  );
}
