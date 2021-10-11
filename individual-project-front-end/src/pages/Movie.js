import './Movie.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function Movie() {
    const [movie, setMovie] = useState({});
    let { id } = useParams();


    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })

    }, [])


    return (
        <div className="movie-page">
            <div className="movie-page-photo">Movie photo</div>
            <div className="movie-page-info">
                <h1>{movie.title}</h1>
                <h3>Release date: {movie.releaseDate}</h3>
                <p>{movie.description}</p>
            </div>
        </div>
    )
}

export default Movie;