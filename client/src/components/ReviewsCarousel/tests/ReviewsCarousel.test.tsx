import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReviewsCarousel from '..';

describe('ReviewsCarousel Component', () => {
  it('renders the correct review', () => {
    render(<ReviewsCarousel />);

    expect(screen.getByText(/The facial treatment was amazing!/i)).toBeInTheDocument();
  });

  it('moves to the next review when next button is clicked', () => {
    render(<ReviewsCarousel />);
    expect(screen.getByText(/The facial treatment was amazing!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Next review'));
    expect(screen.getByText(/I had a great experience/i)).toBeInTheDocument();
  });

  it('moves to the previous review when previous button is clicked', () => {
    render(<ReviewsCarousel />);
    expect(screen.getByText(/The facial treatment was amazing!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Previous review'));
    expect(screen.getByText(/I love the atmosphere here/i)).toBeInTheDocument();
  });

  it('should automatically slide to the next review after 5 seconds', () => {
    vi.useFakeTimers();

    render(<ReviewsCarousel />);
    expect(screen.getByText(/The facial treatment was amazing!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText(/I love the atmosphere here/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText(/I had a great experience/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
