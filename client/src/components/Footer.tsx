import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpeningHours from './OpeningHours';

export default function Footer() {
  return (
    <footer className="main-color mt-5">
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-3">
            <h3>Contact</h3>
            <p className="mb-0">Beauty Salon</p>
            <p className="mb-0">Beautystraße 123</p>
            <p className="mb-0">12345 Duisburg</p>
            <p>+49 12 3456789</p>
          </Col>
          <OpeningHours />
          <p className="text-center mt-2">
            Copyright &copy; {new Date().getFullYear()} Beauty Salon
          </p>
        </Row>
      </Container>
    </footer>
  );
}
