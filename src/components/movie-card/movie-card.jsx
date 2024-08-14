import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movie-card.scss";

const MovieCard = ({token, movieData, user, onUpdateUser }) => {
const isFavorite = user.FavoriteMovies.includes(movieData.title);
  const addToFavorites = async () => {
    try {

      const response = await axios.post(
        `https://movieurl-6be02303c42f.herokuapp.com/users/${user.Username}/movies/${movieData.id}`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the JWT token in the request headers
        }
      );

      // Update user data with the new favorites list
      onUpdateUser(response.data);
    } catch (error) {
      console.error("Failed to add movie to favorites:", error);
    }
  };

  return (
    <Card className="h-100">
      {isFavorite && (
        <div className="favorite-bar">
          Favorite
        </div>
      )}
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text style={{ textAlign: "right" }}>{movieData.runtime}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
            <Button variant="link">View</Button>
          </Link>
          {!isFavorite && (
            <Button variant="outline-primary" onClick={addToFavorites}>
              +
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    Username: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateUser: PropTypes.func.isRequired, // This function should update the user's state
};

export { MovieCard };
