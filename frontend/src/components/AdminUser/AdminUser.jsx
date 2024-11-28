import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importing Auth Context
//TODO: USER admin control
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && token) {
      fetchUsers();
    } else {
      setError('Unauthorized: Please log in.'); //TODO redicret to unauth page
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td> {/* You can hide this in real apps */}
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
