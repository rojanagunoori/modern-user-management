// src/components/App.js
import React, { Component } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

import UserList from './components/UserList.js';
import UserForm from './components/UserForm.js';
import ErrorBoundary from './components/ErrorBoundary.js';

// Global style for modern fonts, colors, and resets
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f7f9fc;
    color: #333;
  }
  button {
    cursor: pointer;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
`;

const Header = styled.h1`
  text-align: center;
  color: #2c3e50;
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: #fff;
  margin-bottom: 20px;
  &:hover {
    background-color: #2980b9;
  }
`;

class App extends Component {
  state = {
    users: [],
    currentUser: null,
    error: null,
    isEditing: false,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  // Fetch users from JSONPlaceholder and simulate additional fields.
  fetchUsers = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((user) => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          department: 'N/A', // No department info provided by API
          // Optionally include an avatar image (using a placeholder image)
          avatar: `https://i.pravatar.cc/150?img=${user.id}`,
        }));
        this.setState({ users });
      })
      .catch(() => {
        this.setState({ error: 'Failed to fetch users' });
      });
  };

  // Voice feedback: Read aloud the user's details.
  speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  handleAddUserClick = () => {
    this.setState({
      currentUser: { id: '', firstName: '', lastName: '', email: '', department: '', avatar: '' },
      isEditing: false,
    });
  };

  handleEditUser = (user) => {
    this.setState({ currentUser: user, isEditing: true });
    // Optional: Speak the user's name upon editing.
    this.speak(`Editing ${user.firstName} ${user.lastName}`);
  };

  handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUsers = this.state.users.filter((user) => user.id !== id);
        this.setState({ users: updatedUsers });
        // Speak deletion confirmation.
        this.speak('User deleted successfully');
      })
      .catch(() => {
        this.setState({ error: 'Failed to delete user' });
      });
  };

  handleFormSubmit = (user) => {
    if (this.state.isEditing) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then(() => {
          const updatedUsers = this.state.users.map((u) => (u.id === user.id ? user : u));
          this.setState({ users: updatedUsers, currentUser: null });
          this.speak('User updated successfully');
        })
        .catch(() => {
          this.setState({ error: 'Failed to update user' });
        });
    } else {
      axios
        .post('https://jsonplaceholder.typicode.com/users', user)
        .then((response) => {
          // Generate a random id if not returned.
          user.id = response.data.id || Math.floor(Math.random() * 1000) + 100;
          this.setState({ users: [...this.state.users, user], currentUser: null });
          this.speak('User added successfully');
        })
        .catch(() => {
          this.setState({ error: 'Failed to add user' });
        });
    }
  };

  handleCancelForm = () => {
    this.setState({ currentUser: null });
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <Container>
          <Header>User Management</Header>
          {this.state.error && <div style={{ color: 'red' }}>{this.state.error}</div>}
          <AddButton onClick={this.handleAddUserClick}>Add User</AddButton>
          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <UserList
                users={this.state.users}
                onEdit={this.handleEditUser}
                onDelete={this.handleDeleteUser}
              />
            </motion.div>
          </ErrorBoundary>
          {this.state.currentUser && (
            <UserForm
              user={this.state.currentUser}
              onSubmit={this.handleFormSubmit}
              onCancel={this.handleCancelForm}
            />
          )}
        </Container>
      </>
    );
  }
}

export default App;



/*// src/App.js
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes //Switch 

} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import UserList from './components/UserList.js';
import Profile from './components/Profile.js';
import ThreeAnimation from './components/ThreeAnimation.js';
import ErrorBoundary from './components/ErrorBoundary.js';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f7f9fc;
    color: #333;
  }
`;

const Content = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;

const PageContainer = styled(motion.div)`
  width: 100%;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Content>

        <Sidebar />
        <Main>
          <ErrorBoundary>
            <PageContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
               {/* <Route path="/" element={
                  <>
                    <h2>Welcome</h2>
                    <ThreeAnimation />
                  </>
                } />/}


                <Route path="/users" element={<UserList />} />


                <Route path="/profile" element={<Profile />}
                />
         
              </Routes>
            </PageContainer>
          </ErrorBoundary>
        </Main>
      </Content>
    </Router>
  );
}

export default App;
*/

