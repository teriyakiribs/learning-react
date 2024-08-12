// components/TemperatureConverter.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TemperatureConverter from './TemperatureConverter';

test('renders TemperatureConverter component with initial state', () => {
    render(<TemperatureConverter />);
    const celsiusInput = screen.getByLabelText(/Celsius/i);
    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);
    expect(celsiusInput).toBeInTheDocument();
    expect(fahrenheitInput).toBeInTheDocument();
    expect(celsiusInput).toHaveValue('');
    expect(fahrenheitInput).toHaveValue('');
});

test('converts Celsius to Fahrenheit correctly', () => {
    render(<TemperatureConverter />);
    const celsiusInput = screen.getByLabelText(/Celsius/i);
    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);

    fireEvent.change(celsiusInput, { target: { value: '100' } });
    expect(fahrenheitInput).toHaveValue('212');
});

test('converts Fahrenheit to Celsius correctly', () => {
    render(<TemperatureConverter />);
    const celsiusInput = screen.getByLabelText(/Celsius/i);
    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);

    fireEvent.change(fahrenheitInput, { target: { value: '32' } });
    expect(celsiusInput).toHaveValue('0');
});

test('handles invalid input for Celsius', () => {
    render(<TemperatureConverter />);
    const celsiusInput = screen.getByLabelText(/Celsius/i);
    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);

    fireEvent.change(celsiusInput, { target: { value: 'abc' } });
    expect(fahrenheitInput).toHaveValue('');
});

test('handles invalid input for Fahrenheit', () => {
    render(<TemperatureConverter />);
    const celsiusInput = screen.getByLabelText(/Celsius/i);
    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);

    fireEvent.change(fahrenheitInput, { target: { value: 'xyz' } });
    expect(celsiusInput).toHaveValue('');
});