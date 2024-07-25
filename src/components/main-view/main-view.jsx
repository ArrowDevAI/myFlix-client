
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "./main-view.scss"

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movieurl-6be02303c42f.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            director: doc.Director.Name,
            description: doc.Description,
            runtime: doc.Runtime
           
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

return (
  <>
<Row className = "justify-content-md-center">
  {!user ? (

<Col md={5}>
<LoginView onLoggedIn={(user, token)=> {setToken(token); setUser(user);}}/>
  or
  <SignupView/>
</Col>

  ) : ( selectedMovie? (
    <Col md={5} >
    <MovieView 
    movieData = {selectedMovie} 
    onBackClick={()=> setSelectedMovie(null)}/>
    </Col>
  ) : movies.length === 0 ? (
    <div>The List is Empty</div>)
    : (
    <>
    {movies.map((movieData)=> (
      <Col className = "mb-5" key={movieData.id} md={3} >
      <MovieCard key = {movieData.id} movieData = {movieData} onMovieClick={(newSelectedMovie)=> {
        setSelectedMovie(newSelectedMovie)
      }}
      />
      </Col>
    ))}

    </>
  )

  )}
</Row>
<Row >
  <Col md={6}>
          <button
            className="button"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </Col>
      </Row>
    </>
  );
};

export { MainView };