
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-view/navigation-view";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss"
import { EditProfile } from "../edit-profile/edit-profile";
import { UpdatePassword} from "../update-password/update-password";
import { FavoriteView } from "../favorites-view/favorites-view";  


const MainView = () => {


  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  

  const onUpdateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  useEffect(() => {
    if (!token) {
          return;
    }

    fetch ("https://movieurl-6be02303c42f.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image:doc.ImagePath,
            director: doc.Director.Name,
            description: doc.Description,
            runtime: doc.Runtime

          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

 
  return (
    <BrowserRouter>
   <NavigationBar
        user={user}
        onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('editedUser');
      }}
    />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (<Navigate to="/" />) : (<Col md={5}><SignupView /></Col>)}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (<Navigate to = "/" />) : (<Col md={5}> <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} /> </Col>)}
              </>
            }
          />
          <Route
          path = "/profile"
          element = {
            <>
              {!user ? (<Navigate to="/login" replace />) :
                  (<Col md={7}><EditProfile token={token} user={user} onUpdateUser = {onUpdateUser}/> </Col>)}
            </>
          }

         />
         <Route
          path = "/update-password"
          element = {
            <>
              {!user ? (<Navigate to="/login" replace />) :
                  (<Col md={7}>  <UpdatePassword token={token} user={user}/> </Col>)}
            </>
          }

         />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (<Navigate to="/login" replace />) : movies.length === 0 ? (<Col>The List Is Empty </Col>) :
                  (<Col md={7}> <MovieView movies={movies} /> </Col>)}
              </>
            }
          />
          
          <Route
            path="/favorites"
            element={
              <>
                {!user ? (<Navigate to="/login" replace />) : movies.length === 0 ? (<Col>The List Is Empty </Col>) :
                  (<Col md={7}><FavoriteView onUpdateUser = {onUpdateUser} user = {user} token = {token} movies = {movies} /> </Col>)}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (<Navigate to="/login" replace />) : movies.length === 0 ? (<Col>The List is Empty</Col>) : (
                  <>
                    {movies.map((movieData) => (
                      <Col className="mb-4" key={movieData.id} md={3}><MovieCard onUpdateUser = {onUpdateUser} token = {token} user={user} movieData={movieData} /> </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>

    </BrowserRouter>
  )
};

export { MainView };