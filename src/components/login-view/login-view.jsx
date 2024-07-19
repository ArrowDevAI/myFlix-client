import {useState} from 'react';

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
        if(data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token)
            onLoggedIn(data.user, data.token);
        }else{
            alert ("User Not Found")
        }
    })
    .catch ((e)=>{
        alert ("Something Went Wrong");
    });
    };

    return(
        <form onSubmit = {handleSubmit}>
            <label>

                Username: 
                <input 
                type = 'text'
                value= {username}
                onChange={(e)=> setUsername(e.target.value)} required 
                 />

            </label>

            <label>

                Password: 
                <input 
                type = 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}required
                />
            
            </label>

            <button type ='submit'>Submit</button>

        </form>
    );
};


export {LoginView};