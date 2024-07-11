import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Star Wars Episode IV: A New Hope",
      image: "https://i.pinimg.com/originals/88/d5/f1/88d5f1fb96109747539d74225f520183.jpg",
      director: "George Lucas",
    },
    {
      id: 2,
      title: "Star Wars Episode III: Revenge of the Sith",
      image: "https://th.bing.com/th/id/OIP.jMtQqT_spmw3a-oTlxoDYAAAAA?rs=1&pid=ImgDetMain",
      director: "George Lucas",
    },
    {
      id: 3,
      title: "Star Wars Episode II: Attack of the Clones",
      image: "https://th.bing.com/th/id/OIP._XDgiiblwTmUeDO1r6ijRAAAAA?rs=1&pid=ImgDetMain",
      director: "George Lucas",
    },
  ]);
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
