import './Movie.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import MovieData from '../components/MovieData';
import CinemaRow from '../components/CinemaRow';

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
            <CinemaRow movie={movie}/>
        </div>
    )
}

export default Movie;