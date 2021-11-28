import './Movie.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import MovieData from '../components/MovieData';

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
            <MovieData movie={movie}/>
            <div className="movie-page-cinemas-container">You can watch {movie.title} in:
                <div className="movie-page-cinema"></div>
            </div>
        </div>
    )
}

export default Movie;