import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import BeautySalonImage from '../assets/beauty-salon.jpeg';

export default function About() {
  return (
    <Container className="mt-5">
      <h2 className="mb-3">About Us</h2>
      <Row>
        <Col xs={12} md={6}>
          <Image src={BeautySalonImage} fluid rounded />
        </Col>
        <Col xs={12} md={6} className="mt-3">
          <h3>Beauty Salon</h3>
          <p>
            Since 1999 in the heart of Duisburg, we have been offering our customers first-class
            treatments in various areas.
          </p>
          <p>
            Treat yourself to a break in a pleasant atmosphere and let us pamper you. The
            satisfaction and well-being of our customers is our top priority.
          </p>
          <p>
            We use high-quality branded products for our customers. We not only offer treatments,
            but also various training courses.
          </p>
          <p>We are looking forward to your visit.</p>
        </Col>
      </Row>
    </Container>
  );
}
