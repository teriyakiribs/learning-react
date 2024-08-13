// components/Crud.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Crud from './Crud';

test('renders Crud component with initial state', () => {
    render(<Crud />);

    const prefixInput = screen.getByLabelText(/Prefix:/i);
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);


    const createButton = screen.getByText(/Create/i);
    const updateButton = screen.getByText(/Update/i);
    const deleteButton = screen.getByText(/Delete/i);

    expect(prefixInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(updateButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
});

test('adds a new name to the list when Create is clicked', () => {
    render(<Crud />);

    const prefixInput = screen.getByLabelText(/Prefix:/i);
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);

    fireEvent.change(prefixInput, { target: { value: 'Dr.' } });
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    const listItem = screen.getByText('Dr. John Doe');
    expect(listItem).toBeInTheDocument();
});

test('updates the selected name in the list when Update is clicked', () => {
    render(<Crud />);

    const prefixInput = screen.getByLabelText(/Prefix:/i);
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);
    const updateButton = screen.getByText(/Update/i);

    fireEvent.change(prefixInput, { target: { value: 'Dr.' } });
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    fireEvent.click(screen.getByText('Dr. John Doe'));
    fireEvent.change(prefixInput, { target: { value: 'Mr.' } });
    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.change(surnameInput, { target: { value: 'Smith' } });
    fireEvent.click(updateButton);

    const updatedListItem = screen.getByText('Mr. Jane Smith');
    expect(updatedListItem).toBeInTheDocument();
});

test('deletes the selected name from the list when Delete is clicked', () => {
    render(<Crud />);

    const prefixInput = screen.getByLabelText(/Prefix:/i);
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);
    const deleteButton = screen.getByText(/Delete/i);

    fireEvent.change(prefixInput, { target: { value: 'Dr.' } });
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    fireEvent.click(screen.getByText('Dr. John Doe'));
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Dr. John Doe')).not.toBeInTheDocument();
});
