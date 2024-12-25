import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Stars from '../components/Stars';
import { calculateStarsByIndex } from '../utils/stars';
import { formatDateGerman } from '../utils/time';
import { type ReviewDto } from '@server/shared/dtos';

export default function Reviews() {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(4);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);

        const stars = calculateStarsByIndex(activeButtonIndex);
        const response = await fetch(
          `/api/reviews?limit=10&stars=${stars}&skip=${skip}`,
        );

        if (response.ok) {
          const reviewsDto = (await response.json()) as ReviewDto[];

          if (skip === 0) {
            setReviews(reviewsDto);
          } else {
            setReviews(prevReviews => [...prevReviews, ...reviewsDto]);
          }

          setErrorMessage('');
        } else {
          setErrorMessage('Unable to get reviews.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchReviews();
  }, [activeButtonIndex, skip]);

  const buttonTitles = [
    'One Star',
    'Two Stars',
    'Three Stars',
    'Four Stars',
    'Five Stars',
  ];

  function handleClick(index: number) {
    setActiveButtonIndex(index);
    setSkip(0);
  }

  return (
    <Container className="mt-4 initial-height">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {buttonTitles.map((title, index) => (
        <Button
          key={index}
          type="button"
          title={title}
          className={`rounded-pill mb-2 me-2 ${activeButtonIndex === index ? 'active-pill' : ''}`}
          onClick={() => handleClick(index)}
          disabled={index === activeButtonIndex}
        />
      ))}

      {isLoading ? (
        <div className="d-flex justify-content-start align-items-center my-4">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {reviews.length > 0 ? (
            <Row className="my-3">
              {reviews.map(review => (
                <Col
                  key={review.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {Stars({ numberOfFullStars: review.stars })}
                      </Card.Title>
                      <Card.Text>
                        {formatDateGerman(review.updatedAt.toString())}
                      </Card.Text>
                      <Card.Text style={{ fontSize: '1.4em' }}>
                        &quot;{review.reviewText}&quot;
                      </Card.Text>
                      <Card.Text>- {review.user!.fullName}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="my-3">There are no reviews yet.</p>
          )}

          {reviews.length > 0 && (
            <>
              <Button
                type="button"
                title="See More"
                className="me-3 mb-3"
                onClick={() => {
                  setSkip(prevSkip => prevSkip + 10);
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                title="See Less"
                className="me-3 mb-3"
                onClick={() => {
                  setSkip(0);
                }}
                disabled={isLoading}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
