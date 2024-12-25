import Container from 'react-bootstrap/Container';
import BeautyFaceImage from '../assets/beauty-face.jpeg';
import About from '../components/About';
import BookButton from '../components/BookButton';

export default function Home() {
  return (
    <>
      <div
        className="background-image-container d-flex flex-column justify-content-center initial-height"
        style={{
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(${BeautyFaceImage})`,
        }}
      >
        <Container className="text-white mt-5">
          <h1>Welcome to the Beauty Salon</h1>
          <p>
            Since 1999 in the heart of Duisburg, we have been offering our
            customers first-class treatments in various areas.
          </p>
          <BookButton />
        </Container>
      </div>

      <About />
    </>
  );
}
