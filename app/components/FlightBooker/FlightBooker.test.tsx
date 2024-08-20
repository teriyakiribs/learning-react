// components/FlightBooker.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlightBooker from './FlightBooker';

test('renders FlightBooker component with initial state', () => {
    render(<FlightBooker />);
    const heading = screen.getByText(/Flight Booker/i);
    expect(heading).toBeInTheDocument();

    const select = screen.getByDisplayValue('One-way flight');
    expect(select).toBeInTheDocument();

    const startDateInput = screen.getByDisplayValue('01-01-2023');
    expect(startDateInput).toBeInTheDocument();

    const returnDateInput = screen.getByDisplayValue('02-01-2023');
    expect(returnDateInput).toBeInTheDocument();
    expect(returnDateInput).toBeDisabled();

    const button = screen.getByRole('button', { name: /Book Flight/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
});

test('enables return date input when return flight is selected', () => {
    render(<FlightBooker />);
    const returnDateInput = screen.getByDisplayValue('02-01-2023');

    expect(returnDateInput).toBeDisabled();

    const select = screen.getByDisplayValue('One-way flight');
    fireEvent.change(select, { target: { value: 'return flight' } });

    expect(returnDateInput).not.toBeDisabled();
});

test('disables button if return date is before start date', () => {
    render(<FlightBooker />);
    const select = screen.getByDisplayValue('One-way flight');
    fireEvent.change(select, { target: { value: 'return flight' } });

    const returnDateInput = screen.getByDisplayValue('02-01-2023');
    fireEvent.change(returnDateInput, { target: { value: '31-12-2022' } });

    const button = screen.getByRole('button', { name: /Book Flight/i });
    expect(button).toBeDisabled();
});

test('enables button if return date is after start date', () => {
    render(<FlightBooker />);
    const select = screen.getByDisplayValue('One-way flight');
    fireEvent.change(select, { target: { value: 'return flight' } });

    const returnDateInput = screen.getByDisplayValue('02-01-2023');
    fireEvent.change(returnDateInput, { target: { value: '03-01-2023' } });

    const button = screen.getByRole('button', { name: /Book Flight/i });
    expect(button).not.toBeDisabled();
});

test('shows alert with correct message when booking one-way flight', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<FlightBooker />);

    const button = screen.getByRole('button', { name: /Book Flight/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('You have booked a one-way flight on 01-01-2023.');
});

test('shows alert with correct message when booking return flight', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<FlightBooker />);

    const select = screen.getByDisplayValue('One-way flight');
    fireEvent.change(select, { target: { value: 'return flight' } });

    const returnDateInput = screen.getByDisplayValue('02-01-2023');
    fireEvent.change(returnDateInput, { target: { value: '03-01-2023' } });

    const button = screen.getByRole('button', { name: /Book Flight/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('You have booked a return flight from 01-01-2023 to 03-01-2023.');
});