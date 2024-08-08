// components/FlightBooker.tsx
"use client";

import React, { useState } from 'react';
import styles from './FlightBooker.module.css';

const FlightBooker: React.FC = () => {
    const [flightType, setFlightType] = useState<string>('one-way flight');
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [returnDate, setReturnDate] = useState<string>('2023-01-02');
    const [isValidStartDate, setIsValidStartDate] = useState<boolean>(true);
    const [isValidReturnDate, setIsValidReturnDate] = useState<boolean>(true);

    const handleFlightTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFlightType(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);
        setIsValidStartDate(validateDate(value));
        if (flightType === 'return flight') {
            setIsValidReturnDate(validateDate(returnDate) && new Date(returnDate) >= new Date(value));
        }
    };

    const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReturnDate(value);
        setIsValidReturnDate(validateDate(value) && new Date(value) >= new Date(startDate));
    };

    const validateDate = (dateString: string) => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false; // Invalid format
        const d = new Date(dateString);
        const dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    };

    const isButtonDisabled = () => {
        if (!isValidStartDate || (flightType === 'return flight' && !isValidReturnDate)) return true;
        if (flightType === 'return flight' && new Date(returnDate) < new Date(startDate)) return true;
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
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className={`${styles.inputField} ${!isValidStartDate ? styles.invalid : ''}`}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <label>
                    Return Date:
                    <input
                        type="date"
                        value={returnDate}
                        onChange={handleReturnDateChange}
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