
"use client";

import React, { useState, useEffect } from 'react';
import styles from './Crud.module.css';

const Crud: React.FC = () => {
    const [names, setNames] = useState<string[]>([]);
    const [prefix, setPrefix] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        // Filtering logic can be placed here if we need to filter the displayed list in real-time
    }, [prefix]);

    const handleAdd = () => {
        const fullName = `${prefix} ${name} ${surname}`.trim();
        setNames([...names, fullName]);
        setPrefix('')
        setName('');
        setSurname('');
    };

    const handleUpdate = () => {
        if (selectedIndex !== null) {
            const updatedNames = [...names];
            updatedNames[selectedIndex] = `${prefix} ${name} ${surname}`;
            setNames(updatedNames);
            setPrefix('')
            setName('');
            setSurname('');
            setSelectedIndex(null);
        }
    };

    const handleDelete = () => {
        if (selectedIndex !== null) {
            const updatedNames = names.filter((_, index) => index !== selectedIndex);
            setNames(updatedNames);
            setPrefix('')
            setName('');
            setSurname('');
            setSelectedIndex(null);
        }
    };

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        const [selectedPrefix, selectedName, selectedSurname] = names[index].split(' ');
        setPrefix(selectedPrefix)
        setName(selectedName);
        setSurname(selectedSurname);
    };

    const filteredNames = names.filter((name) =>
        name.split(' ')[1].startsWith(prefix)
    );

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label htmlFor="prefix">Prefix:</label>
                <input
                    id="prefix"
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
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