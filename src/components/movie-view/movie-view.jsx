import "./movie-view.scss";

const MovieView = ({ movieData, onBackClick }) => {
    return (
      <div>
        <div>
          <img style={{ width: '100%' }} alt={movieData.title} src={movieData.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movieData.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movieData.director}</span>
        </div>
        <button className= 'button' onClick={onBackClick}>Back</button>
      </div>
      
    );
  };
  
  export {MovieView};
  