// src/components/Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 240px;
  background-color: #ecf0f1;
  padding: 20px;
  border-right: 1px solid #bdc3c7;
  height: 100vh;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #3498db;
  }
`;

const Sidebar = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (onFilterChange) onFilterChange(e.target.value);
  };

  return (
    <SidebarContainer>
      <FilterLabel>Search Users</FilterLabel>
      <FilterInput
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      {/* Add more filter options here */}
    </SidebarContainer>
  );
};

export default Sidebar;
