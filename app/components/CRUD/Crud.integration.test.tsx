import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NamesRepository from './NamesRepository';
import CrudController from './CrudController';
import Crud from "@/app/components/CRUD/Crud";

// Integration test for the Crud component
describe('Crud Component (Integration Test)', () => {
    let repository: NamesRepository;
    let controller: CrudController;

    beforeEach(() => {
        repository = new NamesRepository('http://localhost:8080');
        controller = new CrudController(repository, { render: jest.fn() });
    });

    test('renders Crud component and fetches initial names', async () => {
        render(<Crud />);

        // Expect the initial state of the component
        expect(screen.getByLabelText(/Prefix Filter:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Firstname:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Surname:/i)).toBeInTheDocument();

        // Mock the server response to getNames
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    test('adds a new name to the list when Create is clicked', async () => {
        render(<Crud />);

        // Enter name details
        fireEvent.change(screen.getByLabelText(/Firstname:/i), { target: { value: 'Alice' } });
        fireEvent.change(screen.getByLabelText(/Surname:/i), { target: { value: 'Johnson' } });

        // Click the Create button
        fireEvent.click(screen.getByText(/Create/i));

        // Verify that the name was added
        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
    });

    test('updates the selected name in the list when Update is clicked', async () => {
        render(<Crud />);

        // Mock the initial state
        await waitFor(() => {
            fireEvent.click(screen.getByText('John Doe'));
        });

        // Change the name and click Update
        fireEvent.change(screen.getByLabelText(/Firstname:/i), { target: { value: 'Johnny' } });
        fireEvent.click(screen.getByText(/Update/i));

        // Verify that the name was updated
        await waitFor(() => {
            expect(screen.getByText('Johnny Doe')).toBeInTheDocument();
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });

    test('deletes the selected name from the list when Delete is clicked', async () => {
        render(<Crud />);

        // Mock the initial state
        await waitFor(() => {
            fireEvent.click(screen.getByText('Jane Smith'));
        });

        // Click Delete
        fireEvent.click(screen.getByText(/Delete/i));

        // Verify that the name was deleted
        await waitFor(() => {
            expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        });
    });

    test('filters the list of names based on the prefix', async () => {
        render(<Crud />);

        // Enter a prefix to filter the names
        fireEvent.change(screen.getByLabelText(/Prefix Filter:/i), { target: { value: 'Jo' } });

        // Verify that only names starting with "Jo" are displayed
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        });
    });
});