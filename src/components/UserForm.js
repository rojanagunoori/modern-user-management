// src/components/UserForm.js
import React, { Component } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  width: 100%;
  
   
`;

const FormField = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #34495e;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: #3498db;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #27ae60;
  color: #fff;
  &:hover {
    background-color: #1e8449;
  }
`;

const CancelButton = styled.button`
  background-color: #95a5a6;
  color: #fff;
  &:hover {
    background-color: #7f8c8d;
  }
`;

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id || '',
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      email: props.user.email || '',
      department: props.user.department || '',
      avatar: props.user.avatar || '', // Option to set/change avatar
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        id: this.props.user.id || '',
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        email: this.props.user.email || '',
        department: this.props.user.department || '',
        avatar: this.props.user.avatar || '',
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, firstName, lastName, email, department, avatar } = this.state;
    if (!firstName || !email) {
      alert('First Name and Email are required.');
      return;
    }
    this.props.onSubmit({ id, firstName, lastName, email, department, avatar });
  };

  render() {
    const { firstName, lastName, email, department, avatar } = this.state;
    return (
      <FormContainer>
        <h2>{this.props.user.id ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={this.handleSubmit}>
          <FormField>
            <label>First Name:</label>
            <input type="text" name="firstName" value={firstName} onChange={this.handleChange} required />
          </FormField>
          <FormField>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
          </FormField>
          <FormField>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} required />
          </FormField>
          <FormField>
            <label>Department:</label>
            <input type="text" name="department" value={department} onChange={this.handleChange} />
          </FormField>
          <FormField>
            <label>Avatar URL:</label>
            <input type="text" name="avatar" value={avatar} onChange={this.handleChange} placeholder="Optional image URL" />
          </FormField>
          <ButtonGroup>
            <SubmitButton type="submit">Submit</SubmitButton>
            <CancelButton type="button" onClick={this.props.onCancel}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    );
  }
}

export default UserForm;
