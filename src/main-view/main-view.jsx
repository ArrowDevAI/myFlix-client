import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import PropTypes from "prop-types";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie]= useState(null);
    

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
    </div>
  );
};


export { MainView };
