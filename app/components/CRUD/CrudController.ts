import NamesRepository from './NamesRepository';

class CrudController {
    private repository: NamesRepository;
    private view: any;

    constructor(repository: NamesRepository, view: any) {
        this.repository = repository;
        this.view = view;
    }

    async initializeView() {
        const names = await this.repository.getNames();
        this.view.render(names);
    }

    async addName(firstName: string, lastName: string): Promise<void> {
        await this.repository.addName(firstName, lastName);
        const names = await this.repository.getNames();
        this.view.render(names);
    }

    async updateName(username: string, firstName: string, lastName: string) {
        await this.repository.updateName(username, firstName, lastName);
        const names = await this.repository.getNames();
        this.view.render(names);
    }

    async deleteName(username: string) {
        await this.repository.deleteName(username);
        const names = await this.repository.getNames();
        this.view.render(names);
    }

    async filterNames(prefix: string) {
        const names = await this.repository.getNames();
        const filteredNames = names.filter((name) => {
            const [firstName, lastName] = name.split(' ');
            return (
                firstName.toLowerCase().startsWith(prefix.toLowerCase()) ||
                lastName?.toLowerCase().startsWith(prefix.toLowerCase())
            );
        });
        this.view.render(filteredNames);
    }
}

export default CrudController;