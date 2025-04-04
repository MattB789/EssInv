import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/getUsers') // <-- Adjust URL if needed
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
