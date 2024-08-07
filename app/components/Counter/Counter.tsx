// components/Counter.tsx

"use client";

import React, { useState } from 'react';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Counter</h1>
            <div data-testid='label' style={{ fontSize: '24px', margin: '20px' }}>{count}</div>
            <button onClick={increment} style={{ fontSize: '16px', padding: '10px 20px' }}>Increment</button>
        </div>
    );
};

export default Counter;