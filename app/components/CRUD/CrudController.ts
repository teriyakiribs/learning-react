import NamesRepository from './NamesRepository';

class CrudController {
    private repository: NamesRepository;
    private view: any;

    constructor(repository: NamesRepository, view: any) {
        this.repository = repository;
        this.view = view;
    }

    async initializeView() {
        const names = await this.repository.getAllNames();
        this.view.render(names);
    }

    async addName(name: string) {
        await this.repository.addName(name);
        const names = await this.repository.getAllNames();
        this.view.render(names);
    }

    async updateName(index: number, newName: string) {
        await this.repository.updateName(index, newName);
        const names = await this.repository.getAllNames();
        this.view.render(names);
    }

    async deleteName(index: number) {
        await this.repository.deleteName(index);
        const names = await this.repository.getAllNames();
        this.view.render(names);
    }

    async filterNames(prefix: string) {
        const names = await this.repository.getAllNames();
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