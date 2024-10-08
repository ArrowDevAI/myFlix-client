import {Navbar, Container, Nav, NavbarBrand, NavLink} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = ({user, onLoggedOut})=>{
return (
    <Navbar bg= 'light' expand = 'lg'>
        <Container>
            <Navbar.Brand as = {Link} to = "/">
            MyFlix
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
           
            <Navbar.Collapse id = 'basic-navbard-nav'>
                <Nav className = 'me-auto'>

   
                {!user && (
              <>
                <Nav.Link as={Link} to = "/login">
                  Login
                </Nav.Link>
               
                <Nav.Link as={Link} to = "/signup">
                  Signup
                </Nav.Link>
              </>
            )}


            {user && (
                <>
                    <Nav.Link as = {Link} to = "/" >
                        Home
                    </Nav.Link>

                    <Nav.Link onClick ={onLoggedOut}> 
                        Logout
                    </Nav.Link>               

                    <Nav.Link as = {Link} to = "/profile" >
                    Profile
                    </Nav.Link>
                </>
            )}
                </Nav>
            </Navbar.Collapse>

        </Container>
            {user && (     
    <Container style={{ display: 'flex', justifyContent: 'flex-end' }} >
             <span>Welcome, {user.Username}</span>
    </Container>)}
   

    </Navbar>
);
};

export {NavigationBar};