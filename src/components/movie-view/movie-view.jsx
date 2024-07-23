import "./movie-view.scss";

const MovieView = ({ movieData, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movieData.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movieData.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movieData.director}</span>
        </div>
        <button className= 'back-button' onClick={onBackClick}>Back</button>
      </div>
      
    );
  };
  
  export {MovieView};
  