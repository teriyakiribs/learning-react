// components/Timer.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from './Timer';

jest.useFakeTimers();

test('renders Timer component with initial state', () => {
    render(<Timer />);
    const heading = screen.getByText(/Timer/i);
    expect(heading).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('value', '0');
    expect(progressBar).toHaveAttribute('max', '60');

    const durationLabel = screen.getByText(/60 seconds/i);
    expect(durationLabel).toBeInTheDocument();

    const elapsedTime = screen.getByText(/Elapsed Time: 0 seconds/i);
    expect(elapsedTime).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();
});

test('increments elapsed time every second', () => {
    render(<Timer />);
    act(() => {
        jest.advanceTimersByTime(3000); // Advance timers by 3 seconds
    });

    const elapsedTime = screen.getByText(/Elapsed Time: 3 seconds/i);
    expect(elapsedTime).toBeInTheDocument();
});

test('stops the timer when duration is reached', () => {
    render(<Timer />);
    act(() => {
        jest.advanceTimersByTime(60000); // Advance timers by 60 seconds
    });

    const elapsedTime = screen.getByText(/Elapsed Time: 60 seconds/i);
    expect(elapsedTime).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(1000); // Advance timers by 1 more second
    });

    expect(elapsedTime).toHaveTextContent('Elapsed Time: 60 seconds'); // Timer should stop at 60 seconds
});

test('resets the timer when reset button is clicked', () => {
    render(<Timer />);
    act(() => {
        jest.advanceTimersByTime(3000); // Advance timers by 3 seconds
    });

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    const elapsedTime = screen.getByText(/Elapsed Time: 0 seconds/i);
    expect(elapsedTime).toBeInTheDocument();
});

test('updates duration and restarts timer when duration is increased', () => {
    render(<Timer />);
    const durationInput = screen.getByLabelText(/Duration:/i);

    fireEvent.change(durationInput, { target: { value: '120' } });

    const durationLabel = screen.getByText(/120 seconds/i);
    expect(durationLabel).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(121000); // Advance timers by 121 seconds
    });

    const elapsedTime = screen.getByText(/Elapsed Time: 121 seconds/i);
    expect(elapsedTime).toBeInTheDocument();
});