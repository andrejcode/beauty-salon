import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OpeningHours from '../OpeningHours';
import useFetchBusinessTimes from '@/hooks/useFetchBusinessTimes';

vi.mock('@/hooks/useFetchBusinessTimes');

describe('OpeningHours Component', () => {
  it('displays loading spinner when times are loading', () => {
    vi.mocked(useFetchBusinessTimes).mockReturnValue({
      times: null,
      isLoadingTimes: true,
    });

    render(<OpeningHours />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays opening hours correctly when loaded', () => {
    vi.mocked(useFetchBusinessTimes).mockReturnValue({
      times: {
        id: 1,
        startTime: '09:00:00',
        endTime: '17:00:00',
        offDays: ['Sunday', 'Saturday'],
      },
      isLoadingTimes: false,
    });

    render(<OpeningHours />);

    expect(screen.getByText('09:00 - 17:00')).toBeInTheDocument();
    expect(screen.getByText('Closed on: Sunday, Saturday')).toBeInTheDocument();
  });

  it('displays error message when times are not available', () => {
    vi.mocked(useFetchBusinessTimes).mockReturnValue({
      times: null,
      isLoadingTimes: false,
    });

    render(<OpeningHours />);

    expect(
      screen.getByText('Opening hours are not available at the moment.'),
    ).toBeInTheDocument();
  });
});
