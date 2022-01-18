import './MovieRow.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import MovieCard from './MovieCard';
import authHeader from '../authHeader';

function MovieRow() {
    const [movies, setMovies] = useState(null);
    const [user, setUser] = useState({});


    const getData = () => {
        axios
            .get("http://localhost:8080/movies")
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                } else {
                    setMovies(res.data);
                }
            });
    }

    const getUser = () => {
        axios
            .get("http://localhost:8080/user/account", { headers: authHeader(), })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                } else {
                    setUser(res.data);
                }
            });
    }

    useEffect(() => {
        getData();
        getUser();
    }, []);
    return (
        <div className="movie-row" id="movies">
            {localStorage.getItem('accessToken') ?
                <div className='home-page-reservation'>
                    {user.role === "ADMIN" ? <div className='admin-edit-link'><a href='/admin-settings'>ADD MOVIES AND THEATRES.</a></div> : <></>}
                    <Link className='reservation-link' to="/reserve">Start your reservation now!</Link>
                </div>
                :
                <div className='home-page-reservation'><p>In order to make a reservation you need to login.</p></div>
            }
            <div className="movie-row-header"><h1>List of movies</h1></div>
            {movies && (
                <div className="movies">

                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default MovieRow;