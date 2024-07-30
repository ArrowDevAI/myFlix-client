import "./movie-view.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
    return (
      <div>
        <div>
          <img style={{ width: '50%' }} alt={movie.title} src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <Link to = {`/`}>
        <button className= 'button'>Back</button>
        </Link>
      </div>
      
    );
  };
  
  export {MovieView};
  