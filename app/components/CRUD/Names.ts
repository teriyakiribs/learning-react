class Names {
    private names: string[] = [];

    getNames(): string[] {
        return this.names;
    }

    addName(name: string) {
        this.names = [...this.names, name];
    }

    updateName(index: number, newName: string) {
        if (index >= 0 && index < this.names.length) {
            this.names[index] = newName;
        }
    }

    deleteName(index: number) {
        if (index >= 0 && index < this.names.length) {
            this.names = this.names.filter((_, i) => i !== index);
        }
    }

    filterNames(prefix: string): string[] {
        return this.names.filter((name) => {
            const [firstName, lastName] = name.split(' ');
            return (
                firstName.toLowerCase().startsWith(prefix.toLowerCase()) ||
                lastName?.toLowerCase().startsWith(prefix.toLowerCase())
            );
        });
    }
}

export default Names;