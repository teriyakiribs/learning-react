import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CircleDrawer from './CircleDrawer';

// Mocking the canvas context
beforeEach(() => {
    const fillStyle = { value: '' };
    const mockGetContext = jest.fn().mockReturnValue({
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn().mockImplementation(() => {
            if (fillStyle.value === 'gray') {
                return [128, 128, 128, 255];
            }
            return [0, 0, 0, 0];
        }),
        stroke: jest.fn(),
        set fillStyle(value) {
            fillStyle.value = value;
        },
        get fillStyle() {
            return fillStyle.value;
        },
        getImageData: jest.fn().mockReturnValue({
            data: [0, 0, 0, 0], // Mocked getImageData implementation
        }),
    });

    HTMLCanvasElement.prototype.getContext = mockGetContext;
});

test('renders CircleDrawer component with initial state', () => {
    render(<CircleDrawer />);

    const canvas = screen.getByRole('img');
    const undoButton = screen.getByText(/Undo/i);
    const redoButton = screen.getByText(/Redo/i);

    expect(canvas).toBeInTheDocument();
    expect(undoButton).toBeInTheDocument();
    expect(redoButton).toBeInTheDocument();
});

test('creates a circle with left-click', () => {
    render(<CircleDrawer />);

    const canvas = screen.getByRole('img');

    fireEvent.click(canvas, { clientX: 100, clientY: 100, button: 0 });

    // @ts-ignore
    const ctx = canvas.getContext('2d');
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledWith(100, 100, 20, 0, Math.PI * 2);
    expect(ctx.stroke).toHaveBeenCalled();
});

test('selects a circle with mouse movement', () => {
    render(<CircleDrawer />);

    const canvas = screen.getByRole('img');

    fireEvent.click(canvas, { clientX: 100, clientY: 100, button: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });

    // @ts-ignore
    const ctx = canvas.getContext('2d');
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.fillStyle).toBe('gray');
});


// test('adjusts the diameter of the selected circle', () => {
//     render(<CircleDrawer />);
//
//     const canvas = screen.getByRole('img');
//
//     fireEvent.click(canvas, { clientX: 100, clientY: 100, button: 0 });
//     fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
//     fireEvent.contextMenu(canvas, { clientX: 100, clientY: 100 });
//
//     const slider = screen.getByRole('slider');
//
//     fireEvent.change(slider, { target: { value: '50' } });
//
//     // @ts-ignore
//     const ctx = canvas.getContext('2d');
//     const imageData = ctx.getImageData(100, 100, 1, 1).data;
//
//     expect(imageData).toEqual([128, 128, 128, 255]); // Ensure the circle is still filled with gray
// });
//
//
// test('undoes and redoes circle creation', () => {
//     render(<CircleDrawer />);
//
//     const canvas = screen.getByRole('img');
//     const undoButton = screen.getByText(/Undo/i);
//     const redoButton = screen.getByText(/Redo/i);
//
//     fireEvent.click(canvas, { clientX: 100, clientY: 100, button: 0 });
//     fireEvent.click(undoButton);
//
//     // @ts-ignore
//     let ctx = canvas.getContext('2d');
//     let imageData = ctx.getImageData(100, 100, 1, 1).data;
//
//     expect(imageData).toEqual([0, 0, 0, 0]); // Ensure the circle was removed
//
//     fireEvent.click(redoButton);
//
//     // @ts-ignore
//     ctx = canvas.getContext('2d');
//     imageData = ctx.getImageData(100, 100, 1, 1).data;
//
//     expect(imageData).not.toEqual([0, 0, 0, 0]); // Ensure the circle was redrawn
// });