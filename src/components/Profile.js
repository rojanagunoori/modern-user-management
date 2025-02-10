// src/components/Profile.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  width: 100%;
`;

const Profile = () => {
  // For demo, static profile data
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    avatar: 'https://i.pravatar.cc/150?img=65',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    alert('Profile updated!');
  };

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>Last Name:</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Department:</label>
            <input name="department" value={formData.department} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <img
            src={profile.avatar}
            alt="Profile"
            style={{ width: '150px', borderRadius: '50%', marginBottom: '20px' }}
          />
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Department:</strong> {profile.department}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </ProfileContainer>
  );
};

export default Profile;
