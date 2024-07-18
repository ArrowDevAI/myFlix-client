import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import PropTypes from "prop-types";

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie]= useState(null);
    
    useEffect(() => {
        fetch("https://movieurl-6be02303c42f.herokuapp.com/movies")
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
      }, []);

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
