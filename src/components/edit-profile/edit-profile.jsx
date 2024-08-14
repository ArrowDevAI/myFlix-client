import React, { useState } from 'react';
import { Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

const EditProfile = ({ user, token, onUpdateUser }) => {
    const [editedUser, setEditedUser] = useState({
        username: user?.Username || '',
        birthday: user?.Birthday ? moment.utc(user.Birthday).format('YYYY-MM-DD') : '',
        email: user?.Email || '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         const response = await axios.put(
                `https://movieurl-6be02303c42f.herokuapp.com/users/${user.Username}`,
                {
                    Username: editedUser.username,
                    Birthday: editedUser.birthday,
                    Email: editedUser.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                },
            );

            onUpdateUser(response.data)
            
            console.log("Respnse from API: ", response.data)
     
            alert(`${editedUser.username} updated successfully`);
           
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the information.');
        }
    };

    const handleInputChange = (event) => {

        const { name, value } = event.target;

        if (name === 'birthday') {
            setEditedUser({ ...editedUser, [name]: moment.utc(value).format('YYYY-MM-DD') });
        } else {
            setEditedUser({ ...editedUser, [name]: value });
        }
    };

    const formattedDate = moment.utc(editedUser.birthday).format('YYYY-MM-DD');

    const handleDeregister = async () => {
        if (window.confirm("Are you sure you want to deregister? This action cannot be undone.")) {
            try {
                await axios.delete(
                    `https://movieurl-6be02303c42f.herokuapp.com/users/${user.Username}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

            localStorage.removeItem('user');
            localStorage.removeItem('token');
       


                alert('User deregistered successfully');
                // Optional: Redirect user to the login page or home page
                window.location.href = '/login';
            } catch (error) {
                console.error(error);
                alert('An error occurred while deregistering the user.');
            }
        }
    };

    return (
      <>
       <Container>
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
      <Row>
      <Col md={12} style={{ marginTop: '50px' }}>

          <div>
            <div style={{

              width: '250px',
              height: '250px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              margin: '0 auto'
            }}>
              <img src={user.Img} alt="Profile Picture" style={{ maxWidth: '175%', maxHeight: '175%', objectFit: 'contain' }} />
            </div>


            <div style={{ textAlign: 'center' }}>
              <h2>{user.Username}</h2>
            </div>
          </div>

        </Col>
       
      </Row>
    </Container>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editedUser.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="birthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthday"
                                value={formattedDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Update Info
                </Button>
            </Form>
            <div className="text-end" style={{ marginTop: '20px' }}>
                    <Button variant="danger" onClick={handleDeregister}>
                        Deregister
                    </Button>
                </div>
        </Container>
        </>
    );
};

export { EditProfile };
