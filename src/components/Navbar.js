// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  background-color: #2c3e50;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  a {
    color: #ecf0f1;
    margin: 0 10px;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
    &:hover {
      color: #3498db;
    }
  }
`;

const Navbar = () => (
  <NavBarContainer>
    <h1 style={{ color: '#ecf0f1' }}>ModernApp</h1>
    <NavLinks>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/profile">Profile</Link>
    </NavLinks>
  </NavBarContainer>
);

export default Navbar;
