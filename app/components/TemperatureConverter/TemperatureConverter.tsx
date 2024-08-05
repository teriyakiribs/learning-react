// components/TemperatureConverter.tsx
"use client";

import React, { useState } from 'react';
import styles from './TemperatureConverter.module.css'

const TemperatureConverter: React.FC = () => {
    const [celsius, setCelsius] = useState<string>('');
    const [fahrenheit, setFahrenheit] = useState<string>('');

    const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCelsius(value);
        if (!isNaN(Number(value))) {
            const f = (Number(value) * 9) / 5 + 32;
            setFahrenheit(f.toString());
        } else {
            setFahrenheit('');
        }
    };

    const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFahrenheit(value);
        if (!isNaN(Number(value))) {
            const c = (Number(value) - 32) * 5 / 9;
            setCelsius(c.toString());
        } else {
            setCelsius('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Temperature Converter</h1>
            <div style={{ margin: '20px' }}>
                <label>
                    Celsius:
                    <input
                        type="text"
                        value={celsius}
                        onChange={handleCelsiusChange}
                        className={styles.inputField}
                    />
                </label>
            </div>
            <div style={{ margin: '20px' }}>
                <label>
                    Fahrenheit:
                    <input
                        type="text"
                        value={fahrenheit}
                        onChange={handleFahrenheitChange}
                        className={styles.inputField}
                    />
                </label>
            </div>
        </div>
    );
};

export default TemperatureConverter;