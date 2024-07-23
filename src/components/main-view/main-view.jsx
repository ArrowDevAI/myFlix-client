
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"

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


  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />

        Or Signup As New User

        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (<MovieView movieData={selectedMovie} onBackClick={() => {
      setSelectedMovie(null)
    }} />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }


  return (
    <div>
      {movies.map((movieData) => (
        <MovieCard
          key={movieData.id}
          movieData={movieData}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button className='back-button' onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};

export { MainView };
