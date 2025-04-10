import React, { useEffect, useState } from 'react';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [inputName, setInputName] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/getUsers')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const getItem = (index) => {
        return users[index];
    };

    const checkName = () => {
        const nameToCheck = inputName.trim().toLowerCase();
        const nameExists = users.some(user =>
            user.first_name.toLowerCase() === nameToCheck ||
            user.last_name.toLowerCase() === nameToCheck
        );
        setResult(nameExists);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Check if Your Name is in the System</h2>
            <input
                type="text"
                placeholder="Enter your first or last name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
            />
            <button onClick={checkName} style={{ marginLeft: '10px' }}>Check</button>

            {result !== null && (
                <p style={{ marginTop: '15px' }}>
                    {result ? '✅ Name found!' : '❌ Name not found.'}
                </p>
            )}
        </div>

    );
};

export default UserTable;

