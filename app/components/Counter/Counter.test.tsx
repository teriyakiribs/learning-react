// components/Counter.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Counter from './Counter';

test('renders Counter component with initial state', () => {
    render(<Counter />);
    const counterText = screen.getByText(/0/i);
    expect(counterText).toBeInTheDocument();
});

test('increments counter on button click', () => {
    render(<Counter />);
    const button = screen.getByText(/Increment/i);
    fireEvent.click(button);
    const counterText = screen.getByText(/1/i);
    expect(counterText).toBeInTheDocument();
});