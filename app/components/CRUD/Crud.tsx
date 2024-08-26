"use client";

import React, { useState, useEffect } from 'react';
import styles from './Crud.module.css';
import Names from './Names';
import CrudController from './CrudController';

const Crud: React.FC = () => {
    const [model] = useState(new Names());
    const [filteredNames, setFilteredNames] = useState<string[]>(model.getNames());
    const [controller] = useState(new CrudController(model, { render: setFilteredNames }));
    const [prefix, setPrefix] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        controller.initializeView();
    }, [controller]);

    const handleAdd = () => {
        const fullName = `${name} ${surname}`.trim();
        controller.addName(fullName);
        setName('');
        setSurname('');
    };

    const handleUpdate = () => {
        if (selectedIndex !== null) {
            const fullName = `${name} ${surname}`.trim();
            controller.updateName(selectedIndex, fullName);
            setName('');
            setSurname('');
            setSelectedIndex(null);
        }
    };

    const handleDelete = () => {
        if (selectedIndex !== null) {
            controller.deleteName(selectedIndex);
            setName('');
            setSurname('');
            setSelectedIndex(null);
        }
    };

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        const [selectedName, selectedSurname] = filteredNames[index].split(' ');
        setName(selectedName);
        setSurname(selectedSurname);
    };

    const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrefix(e.target.value);
        controller.filterNames(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label htmlFor="prefix">Prefix Filter:</label>
                <input
                    id="prefix"
                    type="text"
                    value={prefix}
                    onChange={handlePrefixChange}
                    placeholder="Enter name prefix"
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    data-testid="name-input"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="surname">Surname:</label>
                <input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div className={styles.buttons}>
                <button onClick={handleAdd}>Create</button>
                <button onClick={handleUpdate} disabled={selectedIndex === null}>
                    Update
                </button>
                <button onClick={handleDelete} disabled={selectedIndex === null}>
                    Delete
                </button>
            </div>
            <div className={styles.listContainer}>
                <ul className={styles.nameList}>
                    {filteredNames.map((name, index) => (
                        <li
                            key={index}
                            className={selectedIndex === index ? styles.selected : ''}
                            onClick={() => handleSelect(index)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Crud;