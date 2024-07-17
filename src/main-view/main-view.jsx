import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import PropTypes from "prop-types";

const MainView = () => {
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        fetch("https://movieurl-6be02303c42f.herokuapp.com/")
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
              return {
                id: doc.key,
                title: doc.title,
                image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                author: doc.author_name?.[0],
              };
            });
            setMovies(moviesFromApi);
          });
      }, []);
  const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
  return (<MovieView movieData = {selectedMovie} onBackClick={()=> {
    setSelectedMovie(null)}} />
  );
}

  if (movies.length === 0) {
    return <div>The list is currently empty.</div>;
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
