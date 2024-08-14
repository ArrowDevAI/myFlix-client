import React, { useState } from 'react';
import axios from 'axios';
import { Nav, Col } from 'react-bootstrap';

const UpdatePassword = ({ token, user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Check if new password and retype password match
            if (newPassword !== retypePassword) {
                setError('New password and retype password do not match');
                return;
            }

            // Update the new hashed password via the API
            const response = await axios.put(
                `https://movieurl-6be02303c42f.herokuapp.com/users/${user.Username}`,
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response);
            
            setSuccess('Password changed successfully');
        } catch (err) {
            // Handle specific error message
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error(err);
        }
    };

    return (
        <>
        <Nav fill variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/profile">Edit Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/favorites">Favorite Movies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/update-password">Update Password</Nav.Link>
        </Nav.Item>
      </Nav>

      <Col md={12} style={{ marginTop: '50px' }}>
        <form onSubmit={handlePasswordChange}>
            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Retype New Password:</label>
                <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Change Password</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
        </Col>
        </>
    );
};

export { UpdatePassword };
