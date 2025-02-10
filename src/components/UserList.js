/*
// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableRow = styled(motion.tr)`
  &:hover {
    background-color: #ecf0f1;
  }
`;

const TableCell = styled.td`
  padding: 12px 8px;
  border: 1px solid #bdc3c7;
  text-align: center;
`;

const ActionButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  margin: 0 5px;
  &:hover {
    background-color: #c0392b;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #27ae60;
  &:hover {
    background-color: #1e8449;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  // Fetch users on mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      const data = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: 'N/A',
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      }));
      setUsers(data);
    });
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
  );

  // For demo purposes, the edit and delete functions can be added as needed
  const handleEdit = (user) => {
    alert(`Edit user ${user.firstName}`);
  };

  const handleDelete = (id) => {
    alert(`Delete user with id ${id}`);
  };

  return (
    <>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '300px',
          border: '1px solid #bdc3c7',
          borderRadius: '4px',
        }}
      />
      {filteredUsers.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(user)}>Edit</EditButton>
                  <ActionButton onClick={() => handleDelete(user.id)}>Delete</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;

*/

// src/components/UserList.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for table and rows
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableRow = styled(motion.tr)`
  &:hover {
    background-color: #ecf0f1;
  }
`;

const TableCell = styled.td`
  padding: 12px 8px;
  border: 1px solid #bdc3c7;
  text-align: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ActionButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  margin: 0 5px;
  &:hover {
    background-color: #c0392b;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #27ae60;
  &:hover {
    background-color: #1e8449;
  }
`;

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <EditButton onClick={() => onEdit(user)}>Edit</EditButton>
                  <ActionButton onClick={() => onDelete(user.id)}>Delete</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserList;
