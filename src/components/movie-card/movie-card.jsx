import PropTypes from "prop-types";
const MovieCard = ({ movieData, onMovieClick }) => {
    return(
        <div 
        onClick= {() =>{
            onMovieClick (movieData);
        }}
        >
        {movieData.title}
        </div>
    );
};

  MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string,
        director: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };
  export { MovieCard };
  