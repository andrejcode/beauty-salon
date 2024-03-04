import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../store/UserContext';
import { removeUserToken } from '../utils/auth';
import { CgProfile, CgLogIn, CgLogOut } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { userId, isAdmin, removeUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header>
      <Navbar expand="lg" className="py-3 main-color">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand">Beauty Salon</Navbar.Brand>
          </LinkContainer>
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
                  title={<CgProfile size={'1.5em'} />}
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
                    Logout <CgLogOut />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Login <CgLogIn />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
