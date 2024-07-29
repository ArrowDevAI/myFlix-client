import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import "./movie-card.scss"

const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        
        <Card className = "h-100">
          <Card.Img variant="top" src={movieData.image} />
          <Card.Body>
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text style={{textAlign: "right"}}>{movieData.runtime}</Card.Text>
            <Button onClick={() => onMovieClick(movieData)} variant="link">
              View
            </Button>
          </Card.Body>
        </Card>
      );
    };
    

  MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string. isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
  export { MovieCard };
  