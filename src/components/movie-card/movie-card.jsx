import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

const MovieCard = ({ movieData, onMovieClick }) => {
    console.log("Movie Data: ", movieData);
    return (
        
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={movieData.image} />
          <Card.Body>
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text>{movieData.runtime}</Card.Text>
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
  