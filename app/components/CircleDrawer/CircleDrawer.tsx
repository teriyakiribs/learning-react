// components/CircleDrawer.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './CircleDrawer.module.css';

interface Circle {
    x: number;
    y: number;
    radius: number;
    fill: boolean;
}

const CircleDrawer: React.FC = () => {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [selectedCircleIndex, setSelectedCircleIndex] = useState<number | null>(null);
    const [history, setHistory] = useState<Circle[][]>([]);
    const [redoStack, setRedoStack] = useState<Circle[][]>([]);
    const [isAdjusting, setIsAdjusting] = useState<boolean>(false);
    const [newRadius, setNewRadius] = useState<number>(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            // @ts-ignore
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => {
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.fill ? 'gray' : 'transparent';
                ctx.fill();
                ctx.stroke();
            });
        }
    }, [circles]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = event.clientX - (rect?.left ?? 0);
        const y = event.clientY - (rect?.top ?? 0);
        if (event.button === 0) {
            const newCircle = { x, y, radius: 20, fill: false };
            const newCircles = [...circles, newCircle];
            setHistory([...history, circles]);
            setCircles(newCircles);
            setRedoStack([]);
        } else if (event.button === 2) {
            event.preventDefault();
            let foundIndex = null;
            circles.forEach((circle, index) => {
                const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
                if (distance < circle.radius) {
                    foundIndex = index;
                }
            });
            if (foundIndex !== null) {
                setSelectedCircleIndex(foundIndex);
                setIsAdjusting(true);
                setNewRadius(circles[foundIndex].radius);
            }
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = event.clientX - rect?.left!;
        const y = event.clientY - rect?.top!;
        let foundIndex: React.SetStateAction<number | null> = null;
        circles.forEach((circle, index) => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circle.radius) {
                foundIndex = index;
            }
        });
        setSelectedCircleIndex(foundIndex);
        const newCircles = circles.map((circle, index) => ({
            ...circle,
            fill: index === foundIndex,
        }));
        setCircles(newCircles);
    };

    const handleAdjustDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setNewRadius(value);
        if (selectedCircleIndex !== null) {
            const newCircles = circles.map((circle, index) => {
                if (index === selectedCircleIndex) {
                    return { ...circle, radius: value };
                }
                return circle;
            });
            setCircles(newCircles);
        }
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setRedoStack([...redoStack, circles]);
            setCircles(lastState);
            setHistory(history.slice(0, -1));
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const lastRedoState = redoStack[redoStack.length - 1];
            setHistory([...history, circles]);
            setCircles(lastRedoState);
            setRedoStack(redoStack.slice(0, -1));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
            </div>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                role="img"
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                onContextMenu={(e) => e.preventDefault()}
                className={styles.canvas}
            />
            {isAdjusting && (
                <div className={styles.adjustFrame}>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={newRadius}
                        onChange={handleAdjustDiameter}
                        role="slider"
                    />
                    <button
                        onClick={() => {
                            setIsAdjusting(false);
                            setHistory([...history, circles]);
                            setRedoStack([]);
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default CircleDrawer;