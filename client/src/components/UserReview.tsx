import Stars from './Stars';
import { calculateStarsByIndex } from '../utils/stars';
import { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { getUserToken } from '../utils/auth';
import ModalComponent from './ModalComponent';
import { ReviewDto } from '@server/shared/dtos';
import useTokenExpiration from '../hooks/useTokenExpiration';

const emptyDate = new Date(0);
const initialState: ReviewDto = { id: -1, reviewText: '', stars: 0, updatedAt: emptyDate };

export default function UserReview() {
  const { handleFetchResponse } = useTokenExpiration();

  const [review, setReview] = useState<ReviewDto>(initialState);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchReview() {
      try {
        setIsLoading(true);

        const response = await fetch('/api/reviews/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        });

        if (response.status === 200) {
          const reviewDto = (await response.json()) as ReviewDto;
          setReview(reviewDto);
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchReview();
  }, []);

  function handleStarClick(index: number) {
    setReview((prevReview) => ({ ...prevReview, stars: calculateStarsByIndex(index) }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (review.stars === 0 || review.reviewText === '') {
      setErrorMessage('Please enter all the fields.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/reviews${review.id !== -1 ? '/' + review.id : ''}`, {
        method: `${review.id !== -1 ? 'PATCH' : 'POST'}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ reviewText: review.reviewText, stars: review.stars }),
      });

      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage(`Review successfully ${review.id !== -1 ? 'updated' : 'created'}.`);

        if (review.id === -1) {
          const { id } = (await response.json()) as { id: number };
          setReview((prevReview) => ({ ...prevReview, id }));
        }
      } else {
        await handleFetchResponse(response);

        setErrorMessage(`Unable to ${review.id !== -1 ? 'update' : 'create'} review.`);
        setSuccessMessage('');
      }
    } catch (e) {
      setErrorMessage('An unknown error occurred.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/reviews${'/' + review.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Review successfully deleted.');
        setReview(initialState);
      } else {
        await handleFetchResponse(response);

        setErrorMessage('Unable to delete the review.');
      }
    } catch (e) {
      setErrorMessage('An unknown error occurred.');
    }
  }

  return (
    <>
      <ModalComponent
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        actionButtonTitle="Yes"
        modalTitle="Delete review"
        modalBody="Are you sure you want to delete the review?"
        onAction={() => void handleDelete()}
      />

      <h2>My Review</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {isLoading && (
        <div className="d-flex justify-content-start align-items-center my-3">
          <LoadingSpinner />
        </div>
      )}
      <Form onSubmit={(event) => void handleSubmit(event)} className="my-3">
        <Stars size={'2.5em'} numberOfFullStars={review.stars} onStarClick={handleStarClick} />
        <Form.Group className="mb-3" controlId="reviewText">
          <Form.Control
            placeholder="Enter your review"
            as="textarea"
            rows={4}
            className="mt-3"
            style={{ width: '100%', maxWidth: '400px', resize: 'none' }}
            value={review.reviewText}
            onChange={(event) => {
              event.preventDefault();
              setReview((prevReview) => ({ ...prevReview, reviewText: event.target.value }));
            }}
          />
        </Form.Group>
        {review.id !== -1 && (
          <Button
            type="button"
            title="Delete"
            className="mt-3 me-3"
            onClick={() => setShowModal(true)}
          />
        )}
        <Button type="submit" title="Save" className="mt-3" />
      </Form>
    </>
  );
}
