import React from 'react';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import Crud from './Crud';
import NamesRepository from './NamesRepository';

// Mock the NamesRepository class
jest.mock('./NamesRepository');

const mockGetAllNames = NamesRepository.prototype.getAllNames as jest.Mock;
const mockAddName = NamesRepository.prototype.addName as jest.Mock;
const mockUpdateName = NamesRepository.prototype.updateName as jest.Mock;
const mockDeleteName = NamesRepository.prototype.deleteName as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock data
});

test('renders Crud component with initial state', async () => {
    // await act(async () => {
        render(<Crud />);
    // });

    const prefixInput = screen.getByLabelText(/Prefix Filter:/i);
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

test('adds a new name to the list when Create is clicked', async () => {
    // Mock the methods to return the desired results
    mockGetAllNames.mockResolvedValueOnce([]).mockResolvedValueOnce(['John Doe']);
    mockAddName.mockResolvedValue(undefined);

    render(<Crud />);

    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);

    fireEvent.change(nameInput, { target: { value: 'Mary' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    await waitFor(() => {
        const listItem = screen.getByText('John Doe');
        expect(listItem).toBeInTheDocument();
    });
});

test('updates the selected name in the list when Update is clicked', async () => {
    // Initial setup: mock repository returning empty list initially
    mockGetAllNames.mockResolvedValueOnce([]); // Before adding
    mockGetAllNames.mockResolvedValueOnce(['John Doe']); // After adding
    mockGetAllNames.mockResolvedValueOnce(['Jane Smith']); // After updating
    mockAddName.mockResolvedValue(undefined);
    mockUpdateName.mockResolvedValue(undefined);

    render(<Crud />);

    // Simulate adding a name
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    // Verify that the name was added
    await waitFor(() => {
        const listItem = screen.getByText('John Doe');
        expect(listItem).toBeInTheDocument();
    });

    // Simulate selecting and updating the name
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.change(surnameInput, { target: { value: 'Smith' } });

    const updateButton = screen.getByText(/Update/i);
    fireEvent.click(updateButton);

    // Verify that the name was updated
    await waitFor(() => {
        const updatedListItem = screen.getByText('Jane Smith');
        expect(updatedListItem).toBeInTheDocument();
    });
});

test('deletes the selected name from the list when Delete is clicked', async () => {
    // Initial setup: mock repository returning the name initially, and an empty list after deletion
    mockGetAllNames.mockResolvedValueOnce([]); // Before adding
    mockGetAllNames.mockResolvedValueOnce(['John Doe']); // After adding
    mockGetAllNames.mockResolvedValueOnce([]); // Before deleting

    mockAddName.mockResolvedValue(undefined);
    mockDeleteName.mockResolvedValue(undefined);

    render(<Crud />);

    // Simulate adding a name (this is mocked, but ensures the component behaves as expected)
    const nameInput = screen.getByTestId('name-input');
    const surnameInput = screen.getByLabelText(/Surname:/i);
    const createButton = screen.getByText(/Create/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(createButton);

    // Verify that the name was added
    await waitFor(() => {
        const listItem = screen.getByText('John Doe');
        expect(listItem).toBeInTheDocument();
    });

    // Simulate selecting and deleting the name
    fireEvent.click(screen.getByText('John Doe'));
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Verify that the name was deleted
    await waitFor(() => {
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
});

test('filters the list of names based on the prefix', async () => {
    // Ensure that getAllNames returns an array
    mockGetAllNames.mockResolvedValueOnce([])
        .mockResolvedValueOnce(['John Doe', 'Jane Smith', 'Jay Zee']);

    render(<Crud />);

    const prefixInput = screen.getByLabelText(/Prefix Filter:/i);

    // Type "S" in the prefix filter to filter out "Smith"
    fireEvent.change(prefixInput, { target: { value: 'S' } });

    // Wait for the filtered results to be displayed
    await waitFor(() => {
        expect(screen.queryByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jay Zee')).not.toBeInTheDocument();
    });
});