class NamesRepository {
    private names: string[] = [];

    async getAllNames(): Promise<string[]> {
        // Simulating a database fetch with a promise
        return new Promise((resolve) => {
            setTimeout(() => resolve([...this.names]), 100); // Simulate async operation
        });
    }

    async addName(name: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.names.push(name);
                resolve();
            }, 100);
        });
    }

    async updateName(index: number, newName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (index >= 0 && index < this.names.length) {
                setTimeout(() => {
                    this.names[index] = newName;
                    resolve();
                }, 100);
            } else {
                reject(new Error('Index out of bounds'));
            }
        });
    }

    async deleteName(index: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (index >= 0 && index < this.names.length) {
                setTimeout(() => {
                    this.names = this.names.filter((_, i) => i !== index);
                    resolve();
                }, 100);
            } else {
                reject(new Error('Index out of bounds'));
            }
        });
    }
}

export default NamesRepository;