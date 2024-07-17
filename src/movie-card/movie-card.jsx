import PropTypes from "prop-types";
const MovieCard = ({ movieData, onMovieClick }) => {
    return <div onClick={()=>{
      onMovieClick(movieData);
    }}
    >
      {movieData.title}</div>;
  };
  MovieCard.PropTypes = {
    
  }
  export { MovieCard };
  