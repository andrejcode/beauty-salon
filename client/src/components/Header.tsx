import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NabvarLinks from './NavbarLinks';

export default function Header() {
  return (
    <header>
      <Navbar expand="lg" className="py-3 main-color">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand">Beauty Salon</Navbar.Brand>
          </LinkContainer>
          <NabvarLinks />
        </Container>
      </Navbar>
    </header>
  );
}
