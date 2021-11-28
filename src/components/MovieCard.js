import './MovieCard.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import authHeader from '../authHeader';
import axios from 'axios';

const MovieCard = props => {

    const [moviePicturePath, setMoviePicturePath] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/poster/${props.movie.id}`,{responseType: 'blob'}, { headers: authHeader() })
            .then(res => {
                // console.log(res.data);
               setMoviePicturePath(URL.createObjectURL(res.data))
            })

    }, [])
   

    return (
        <div className="movie-card">
            <Link to={"/movies/" + props.movie.id} className="movie-card-link">
                <div className="movie-photo">
                    <img src={moviePicturePath}/>
                </div>
                <h2>{props.movie.title}</h2>
            </Link>
        </div>
    )
}

export default MovieCard