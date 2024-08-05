// components/Timer.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

const Timer: React.FC = () => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(60);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = window.setInterval(() => {
                setElapsedTime((prevElapsedTime) => {
                    if (prevElapsedTime >= duration) {
                        clearInterval(intervalRef.current as number);
                        return prevElapsedTime;
                    }
                    return prevElapsedTime + 1;
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, duration]);

    useEffect(() => {
        if (elapsedTime >= duration) {
            setIsRunning(false);
        }
    }, [elapsedTime, duration]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value));
        if (elapsedTime < Number(e.target.value)) {
            setIsRunning(true);
        }
    };

    const handleReset = () => {
        setElapsedTime(0);
        setIsRunning(true);
    };

    const percentage = (elapsedTime / duration) * 100;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Timer</h1>
            <div style={{ margin: '20px', height: '30px', width: '300px', border: '1px solid #000', position: 'relative' }}>
                <div style={{ height: '100%', width: `${percentage}%`, backgroundColor: 'green', transition: 'width 0.1s linear' }}></div>
            </div>
            <div>{elapsedTime} seconds</div>
            <input
                type="range"
                min="10"
                max="120"
                value={duration}
                onChange={handleSliderChange}
                style={{ width: '300px', margin: '20px' }}
            />
            <div>Duration: {duration} seconds</div>
            <button onClick={handleReset} style={{ fontSize: '16px', padding: '10px 20px' }}>Reset</button>
        </div>
    );
};

export default Timer;