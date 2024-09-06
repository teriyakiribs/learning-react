// NameRepository.ts

import axios from 'axios';

class NamesRepository {
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    // async getUsers(): Promise<string[]> {
    //     try {
    //         const response = await axios.get(`${this.apiUrl}/user`);
    //         return response.data.map((user: { firstName: string, lastName: string }) => `${user.firstName} ${user.lastName}`);
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //         return [];
    //     }
    // }

    async getNames(): Promise<string[]> {
        try {
            const response = await axios.get(`${this.apiUrl}/user`);
            return response.data.map((user: { firstName: string, lastName: string }) => `${user.firstName} ${user.lastName}`);
        } catch (error) {
            console.error('Error fetching names:', error);
            return [];
        }
    }

    async addName(firstName: string, lastName: string): Promise<void> {
        try {
            await axios.post(`${this.apiUrl}/user`, {
                username: `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                email: '',
                password: '',
                phone: '',
                userStatus: 'REGISTERED'
            });
        } catch (error) {
            console.error('Error adding name:', error);
        }
    }

    async updateName(username: string, firstName: string, lastName: string): Promise<void> {
        try {
            await axios.put(`${this.apiUrl}/user/${username}`, {
                username: `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                email: '',
                password: '',
                phone: '',
                userStatus: 'REGISTERED'
            });
        } catch (error) {
            console.error('Error updating name:', error);
        }
    }

    async deleteName(username: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/user/${username}`);
        } catch (error) {
            console.error('Error deleting name:', error);
        }
    }
}

export default NamesRepository;