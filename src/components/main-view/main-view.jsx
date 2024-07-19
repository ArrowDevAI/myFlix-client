import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import PropTypes from "prop-types";
import {LoginView} from "../login-view/login-view";

const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie]= useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
      if (!token)
{
  return;
}      

fetch("https://movieurl-6be02303c42f.herokuapp.com/movies", {headers: { Authorization: `Bearer ${token}` }})
        .then((response) => response.json())
        .then((data) =>{
          console.log(data);
          const moviesFromApi = data.map((doc) => {
            return {
              id: doc._id,
              title: doc.Title,
              image: doc.ImagePath,
              director: doc.Director.Name
            };
          });
          setMovies(moviesFromApi);
        });
    }, [token]);
    
    
if (!user) {
    return <LoginView onLoggedIn = {(user, token) => {
      setUser(user);
      setToken(token);
    }} />;
}

if (selectedMovie) {
  return (<MovieView movieData = {selectedMovie} onBackClick={()=> {
    setSelectedMovie(null)}} />
  );
}
if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  
  return (
    <div>
      {movies.map((movieData) => (
        <MovieCard 
        key= {movieData.id}
        movieData={movieData}
        onMovieClick={(newSelectedMovie)=>{
        setSelectedMovie(newSelectedMovie);
        }} 
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
    </div>
  );
};

export { MainView };
