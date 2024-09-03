// NamesRepository.integration.test.ts

import NamesRepository from './NamesRepository';

describe('NamesRepository (Integration Test)', () => {
    const apiUrl = 'http://localhost:8080';
    let repository: NamesRepository;

    beforeEach(() => {
        repository = new NamesRepository(apiUrl);
    });

    // test('getUsers should fetch and return all users from the API', async () => {
    //     await repository.addName('Alice', 'Johnson');
    //     await repository.addName('Bob', 'Brown');
    //
    //     const users = await repository.getUsers();
    //
    //     expect(users).toContain('Alice Johnson');
    //     expect(users).toContain('Bob Brown');
    // });

    test('getNames should fetch and return names from the API', async () => {
        await repository.addName('John', 'Doe');
        await repository.addName('Jane', 'Smith');

        const names = await repository.getNames();

        // This assumes your server has these names or similar ones
        expect(names).toContain('John Doe');
        expect(names).toContain('Jane Smith');
    });

    test('updateName should send a PUT request to update a name', async () => {
        const oldFirstName = 'Test';
        const oldLastName = 'User';
        const newFirstName = 'Updated';
        const newLastName = 'User';

        // Add a name first
        await repository.addName(oldFirstName, oldLastName);

        // Update the name
        await repository.updateName(`${oldFirstName} ${oldLastName}`, newFirstName, newLastName);

        const names = await repository.getNames();
        expect(names).toContain(`${newFirstName} ${newLastName}`);
        expect(names).not.toContain(`${oldFirstName} ${oldLastName}`);
    });

    test('deleteName should send a DELETE request to delete a name', async () => {
        const firstName = 'John';
        const lastName = 'Doe';

        // Add a name first
        await repository.addName(firstName, lastName);
        var names = await repository.getNames();


        // Delete the name
        await repository.deleteName(`${firstName} ${lastName}`);

        names = await repository.getNames();
        expect(names).not.toContain(`${firstName} ${lastName}`);
    });

    test('delete a name', async () => {
        const firstName = 'Updated';
        const lastName = 'User';

        // Delete the name
        await repository.deleteName(`${firstName} ${lastName}`);

        let names = await repository.getNames();
        expect(names).not.toContain(`${firstName} ${lastName}`);
    });


});