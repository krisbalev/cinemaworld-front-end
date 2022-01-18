import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './MovieSlide.css'
import axios from 'axios';
import authHeader from '../authHeader';
import ReactPlayer from 'react-player';


const MovieSlide = props => {
    const [moviePicturePath, setMoviePicturePath] = useState('');
    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/photo/${props.movie.id}`, { responseType: 'blob' }, { headers: authHeader() })
            .then(res => {
                setMoviePicturePath(URL.createObjectURL(res.data))
            })
    })

    return (
        <div className="movie-slide">
            <Link to={"/movies/" + props.movie.id} className="movie-slide-link">
            <img className="movie-slide-photo" src={moviePicturePath} />
                <div className="movie-slide-info">
                    <h1>{props.movie.title}</h1>
                    {/* <p>{props.movie.description}</p> */}
                </div>
            </Link>
        </div>
    )
}

export default MovieSlide