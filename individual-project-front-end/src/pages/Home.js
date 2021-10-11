import './Home.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import axios from 'axios';

function Home() {
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
        <div class="home-page">Home page
            <div>
                {movies && (
                    <div className="movies">

                        {movies.map((movie, index) => (
                            <div className="movie-card" key={index}>
                                <Link to={"/movies/" + movie.id}>
                                    <div className="movie-photo">
                                        <p>Movie photo</p>
                                    </div>
                                    <h2>{movie.title}</h2>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}

export default Home;