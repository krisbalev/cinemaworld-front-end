import { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieSlider.css'
import MovieSlide from './MovieSlide';
import BtnSlider from './BtnSlider';

const MovieSlider = () => {
    const [movies, setMovies] = useState([{}, {}, {}, {}, {}])
    const [slideIndex, setSlideIndex] = useState(0);

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
                        //console.log(res.data);
                    }
                    setSlideIndex(0);
                });
        }
        getData();
    }, []);

    
    function SlideForward() {

        if (slideIndex < 4) {
            setSlideIndex(slideIndex + 1);
        } else {
           setSlideIndex(0);
        }

    }

    function SlideBackwards() {

        if (slideIndex > 0) {
            setSlideIndex(slideIndex - 1);
        } else {
            setSlideIndex(4);
        }

    } 

    return (
        <div className="movie-slider">
            <MovieSlide movie={movies[slideIndex]} />
            <BtnSlider moveSlide={SlideBackwards} direction={"prev"} />
            <BtnSlider moveSlide={SlideForward} direction={"next"} />
        </div>
    );
}

export default MovieSlider;