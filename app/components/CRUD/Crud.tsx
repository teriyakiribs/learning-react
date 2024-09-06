"use client";

import React, { useState, useEffect } from 'react';
import styles from './Crud.module.css';
import NamesRepository from './NamesRepository';
import CrudController from './CrudController';

const Crud: React.FC = () => {
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const repository = new NamesRepository('http://localhost:8080'); // Ensure the API URL is correct
    const controller = new CrudController(repository, { render: setFilteredNames });

    const [prefix, setPrefix] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

    useEffect(() => {
        controller.initializeView();
    }, [controller]);

    const handleAdd = async () => {
        await controller.addName(firstname.trim(), surname.trim());
        setFirstname('');
        setSurname('');
    };

    const handleUpdate = async () => {
        if (selectedUsername !== null) {
            await controller.updateName(selectedUsername, firstname.trim(), surname.trim());
            setFirstname('');
            setSurname('');
            setSelectedUsername(null);
        }
    };

    const handleDelete = async () => {
        if (selectedUsername !== null) {
            await controller.deleteName(selectedUsername);
            setFirstname('');
            setSurname('');
            setSelectedUsername(null);
        }
    };

    const handleSelect = (index: number) => {
        const selectedName = filteredNames[index];
        const [selectedFirstName, selectedLastName] = selectedName.split(' ');
        setFirstname(selectedFirstName);
        setSurname(selectedLastName);
        setSelectedUsername(`${selectedFirstName} ${selectedLastName}`); // Assuming username is formed by this pattern
    };

    const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrefix = e.target.value;
        setPrefix(newPrefix);

        controller.filterNames(newPrefix)
            .then((filteredNames) => {
                // You can handle any additional logic here if needed
                console.log('Filtered names:', filteredNames);
            })
            .catch((error) => {
                console.error('Error filtering names:', error);
            });
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
                <label htmlFor="firstname">Firstname:</label>
                <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    data-testid="name-input"
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="surname">Surname: </label>
                <input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div className={styles.buttons}>
                <button onClick={handleAdd}>Create</button>
                <button onClick={handleUpdate} disabled={selectedUsername === null}>
                    Update
                </button>
                <button onClick={handleDelete} disabled={selectedUsername === null}>
                    Delete
                </button>
            </div>
            <div className={styles.listContainer}>
                <ul className={styles.nameList}>
                    {filteredNames && filteredNames.length > 0 ? (
                        filteredNames.map((name, index) => (
                            <li
                                key={index}
                                className={selectedUsername === `${name.split(' ')[0]} ${name.split(' ')[1]}` ? styles.selected : ''}
                                onClick={() => handleSelect(index)}
                            >
                                {name}
                            </li>
                        ))
                    ) : (
                        <li className={styles.emptyMessage}>No names available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Crud;