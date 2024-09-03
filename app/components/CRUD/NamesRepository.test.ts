import axios from 'axios';
import NamesRepository from './NamesRepository';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NamesRepository', () => {
    const apiUrl = 'http://localhost:8080';
    let repository: NamesRepository;

    beforeEach(() => {
        repository = new NamesRepository(apiUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getNames should fetch and return names from the API', async () => {
        // Mock API response
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { firstName: 'John', lastName: 'Doe' },
                { firstName: 'Jane', lastName: 'Smith' }
            ]
        });

        const names = await repository.getNames();

        expect(names).toEqual(['John Doe', 'Jane Smith']);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}/user`);
    });

    test('addName should send a POST request to add a name', async () => {
        mockedAxios.post.mockResolvedValueOnce({});

        await repository.addName('John', 'Doe');

        expect(mockedAxios.post).toHaveBeenCalledWith(`${apiUrl}/user`, {
            username: 'John.Doe',
            firstName: 'John',
            lastName: 'Doe',
            email: '',
            password: '',
            phone: '',
            userStatus: 'REGISTERED'
        });
    });

    test('updateName should send a PUT request to update a name', async () => {
        mockedAxios.put.mockResolvedValueOnce({});

        await repository.updateName('John.Doe', 'John', 'Doe');

        expect(mockedAxios.put).toHaveBeenCalledWith(`${apiUrl}/user/John.Doe`, {
            firstName: 'John',
            lastName: 'Doe',
            email: '',
            password: '',
            phone: '',
            userStatus: 'REGISTERED'
        });
    });

    test('deleteName should send a DELETE request to delete a name', async () => {
        mockedAxios.delete.mockResolvedValueOnce({});

        await repository.deleteName('John.Doe');

        expect(mockedAxios.delete).toHaveBeenCalledWith(`${apiUrl}/user/John.Doe`);
    });

    // test('getNames should return an empty array if the API call fails', async () => {
    //     mockedAxios.get.mockRejectedValueOnce(new Error('API call failed'));
    //
    //     const names = await repository.getNames();
    //
    //     expect(names).toEqual([]);
    //     expect(console.error).toHaveBeenCalledWith('Error fetching names:', expect.any(Error));
    // });
});