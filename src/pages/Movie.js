import './Movie.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import MovieData from '../components/MovieData';
import CinemaRow from '../components/CinemaRow';
import { Link } from "react-router-dom";

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
            {localStorage.getItem('accessToken') ?
                <div className='home-page-reservation'>
                    <Link className='reservation-link' to="/reserve">Start your reservation now!</Link>
                </div>
                :
                <div className='home-page-reservation'><p>In order to make a reservation you need to login.</p></div>
            }
        </div>
    )
}

export default Movie;