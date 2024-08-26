import Names from './Names';

class CrudController {
    private model: Names;
    private view: any; // Placeholder, replace with the view type if needed

    constructor(model: Names, view: any) {
        this.model = model;
        this.view = view;
    }

    initializeView() {
        this.view.render(this.model.getNames());
    }

    addName(name: string) {
        this.model.addName(name);
        this.view.render(this.model.getNames());
    }

    updateName(index: number, newName: string) {
        this.model.updateName(index, newName);
        this.view.render(this.model.getNames());
    }

    deleteName(index: number) {
        this.model.deleteName(index);
        this.view.render(this.model.getNames());
    }

    filterNames(prefix: string) {
        this.view.render(this.model.filterNames(prefix));
    }
}

export default CrudController;