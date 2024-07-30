

import "./login-view.scss";
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const LoginView = ({onLoggedIn}) => {
const [username, setUsername] = useState('');    
const [password, setPassword] = useState('');    

const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)

    const data = {
        Username: username,
        Password: password
    };
    
    fetch ("https://movieurl-6be02303c42f.herokuapp.com/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then ((response)=>response.json())
    .then ((data)=>{
     console.log ('this is the data: ', data)
        if (data.user) {
           localStorage.setItem("user", JSON.stringify(data.user));
           localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
    })
    .catch((e) => {
        console.error('Error:', e);
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 200-299
          console.error('Response:', e.response.status);
          console.error('Data:', e.response.data);
        } else if (e.request) {
          // The request was made but no response was received
          console.error('Request:', e.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', e.message);
        }
        alert(`An error occurred: ${e.message}`);
      });
    };

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3" 
          />
        </Form.Group>
        <Form.Group controlId = "formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type= 'password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            minLength="3"
            />
        </Form.Group>

        <Button variant = "primary" className ='button' type="submit" > Submit </Button>
        </Form>
        
    );
};


export {LoginView};

