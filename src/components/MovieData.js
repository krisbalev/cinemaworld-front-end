import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../authHeader";

const MovieData = ({ movie }) => {
    const [moviePicturePath, setMoviePicturePath] = useState();
    const [moviePosterPath, setMoviePosterPath] = useState();
    const [trailer, setTrailer] = useState("");

    const getTrailer = () => {
        axios
            .get(`http://localhost:8080/movies/trailer/${movie.id}`)
            .then(res => {
                setTrailer(res.data);
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/photo/${movie.id}`, { responseType: 'blob' }, { headers: authHeader() })
            .then(res => {
                setMoviePicturePath(URL.createObjectURL(res.data))
            })

        
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/poster/${movie.id}`, { responseType: 'blob' }, { headers: authHeader() })
            .then(res => {
                // console.log(res.data);
                setMoviePosterPath(URL.createObjectURL(res.data))
            })

    })

    useEffect(() => {
        getTrailer();
    })

    return (
        <div className="movie-page-container">
            <img src={moviePicturePath} className="movie-page-background-image" />
            <div className="movie-page-box">
                <div className="movie-page-photo"><img src={moviePosterPath} /></div>
                <div className="movie-page-info">
                    <h1>{movie.title}</h1>
                    <h3>Release date: {movie.releaseDate}</h3>
                    <p>{movie.description}</p>
                    <button className="trailer-button"><a href={trailer}>Watch trailer</a></button>
                </div>
            </div>
        </div>
    )
}

export default MovieData