import './MovieCard.css'
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";

function MovieCard(props) {
    return (
        <div className="movie-card">
            <Link to={"/movies/" + props.movie.id} className="movie-card-link">
                <div className="movie-photo">
                    <p>Movie photo</p>
                </div>
                <h2>{props.movie.title}</h2>
            </Link>
        </div>
    )
}

export default MovieCard