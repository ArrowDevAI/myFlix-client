import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {Link}  from "react-router-dom";
import "./movie-card.scss";

const MovieCard = ({ movieData}) => {
    return (
        
        <Card className = "h-100">
          <Card.Img variant="top" src={movieData.image} />
          <Card.Body>
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text style={{textAlign: "right"}}>{movieData.runtime}</Card.Text>
            <Link to = {`/movies/${encodeURIComponent(movieData.id)}`}>
            <Button variant = "link">View</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    };
    

  MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string. isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
  };
  export { MovieCard };
  