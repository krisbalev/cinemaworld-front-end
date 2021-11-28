import './MovieRow.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import MovieCard from './MovieCard';

function MovieRow() {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
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
        getData();
    }, []);
    return (
        <div className="movie-row" id="movies">
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