// components/FlightBooker.tsx
"use client";

import React, { useState } from 'react';
import styles from './FlightBooker.module.css';

const FlightBooker: React.FC = () => {
    const [flightType, setFlightType] = useState<string>('one-way flight');
    const [startDate, setStartDate] = useState<string>('01-01-2023');
    const [returnDate, setReturnDate] = useState<string>('02-01-2023');
    const [isValidStartDate, setIsValidStartDate] = useState<boolean>(true);
    const [isValidReturnDate, setIsValidReturnDate] = useState<boolean>(true);

    const handleFlightTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFlightType(e.target.value);
    };

    const validateDate = (dateString: string) => {
        const regEx = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateString.match(regEx)) return false; // Invalid format
        const [day, month, year] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);
        const isValid = validateDate(value);
        setIsValidStartDate(isValid);
        if (flightType === 'return flight' && isValid) {
            setIsValidReturnDate(validateDate(returnDate) && new Date(returnDate.split('-').reverse().join('-')) >= new Date(value.split('-').reverse().join('-')));
        }
    };

    const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReturnDate(value);
        setIsValidReturnDate(validateDate(value) && new Date(value.split('-').reverse().join('-')) >= new Date(startDate.split('-').reverse().join('-')));
    };

    const isButtonDisabled = () => {
        if (!isValidStartDate || (flightType === 'return flight' && !isValidReturnDate)) return true;
        if (flightType === 'return flight' && new Date(returnDate.split('-').reverse().join('-')) < new Date(startDate.split('-').reverse().join('-'))) return true;
        return false;
    };

    const handleSubmit = () => {
        if (flightType === 'one-way flight') {
            alert(`You have booked a one-way flight on ${startDate}.`);
        } else {
            alert(`You have booked a return flight from ${startDate} to ${returnDate}.`);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Flight Booker</h1>
            <div className={styles.field}>
                <select value={flightType} onChange={handleFlightTypeChange} className={styles.selectField}>
                    <option value="one-way flight">One-way flight</option>
                    <option value="return flight">Return flight</option>
                </select>
            </div>
            <div className={styles.field}>
                <label>
                    Start Date:
                    <input
                        type="text"
                        value={startDate}
                        onChange={handleStartDateChange}
                        placeholder="dd-mm-yyyy"
                        className={`${styles.inputField} ${!isValidStartDate ? styles.invalid : ''}`}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <label>
                    Return Date:
                    <input
                        type="text"
                        value={returnDate}
                        onChange={handleReturnDateChange}
                        placeholder="dd-mm-yyyy"
                        disabled={flightType === 'one-way flight'}
                        className={`${styles.inputField} ${!isValidReturnDate ? styles.invalid : ''}`}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <button onClick={handleSubmit} disabled={isButtonDisabled()} className={styles.button}>
                    Book Flight
                </button>
            </div>
        </div>
    );
};

export default FlightBooker;