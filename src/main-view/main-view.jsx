import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import PropTypes from "prop-types";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie]= useState([]);

    useEffect(() => {
        fetch("https://git.heroku.com/movieurl.git")
          .then((response) => response.json())
          .then((data) =>{
            console.log(data);
            const moviesFromApi = data.docs.map((doc) => {
              return {
                id: doc.key,
                title: doc.title,
              };
            });
            setMovies(moviesFromApi);
          });
      }, []);

if (selectedMovie) {
  return (<MovieView movieData = {selectedMovie} onBackClick={()=> {
    setSelectedMovie(null)}} />
  );
}

  
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
        key= {movies.id}
        movieData={movie}
        onMovieClick={(newSelectedMovie)=>{
        setSelectedMovie(newSelectedMovie);
        }} />
      ))}
    </div>
  );
};



export { MainView };
