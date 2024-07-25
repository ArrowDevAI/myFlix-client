
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login-view.scss";
import {useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const LoginView = ({onLoggedIn}) => {
const [username, setUsername] = useState('');    
const [password, setPassword] = useState('');    
const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
        Username: username,
        Password: password
    };
    fetch ("https://movieurl-6be02303c42f.herokuapp.com/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify (data)
    })
    .then ((response)=>response.json())
    .then ((data)=>{
        console.log("Login Response: ", data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
    })
    .catch ((e)=>{
        alert ("Something Went Wrong");
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

        <Button className ='button' type="submit" > Submit </Button>
        </Form>
        
    );
};


export {LoginView};