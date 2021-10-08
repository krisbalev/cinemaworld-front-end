import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
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
                                <a href=""/>
                                <div className="movie-photo">
                                    <p>Movie photo</p>
                                </div>
                                <h2>{movie.title}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}

export default Home;