// components/Timer.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

const Timer: React.FC = () => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(60);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && elapsedTime < duration) {
            timer = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }, 1000);
        } else if (elapsedTime >= duration) {
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, elapsedTime, duration]);

    const handleReset = () => {
        setElapsedTime(0);
        setIsRunning(true);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDuration = Number(e.target.value);
        setDuration(newDuration);
        if (newDuration > elapsedTime) {
            setIsRunning(true);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Timer</h1>
            <div>
                <progress value={elapsedTime} max={duration}></progress>
            </div>
            <div>
                <label>
                    Duration:
                    <input
                        type="range"
                        min="1"
                        max="300"
                        value={duration}
                        onChange={handleDurationChange}
                    />
                    {duration} seconds
                </label>
            </div>
            <div>
                Elapsed Time: {elapsedTime} seconds
            </div>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;