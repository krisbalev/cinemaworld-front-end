import axios from "axios";
import { useEffect, useState } from "react"
import './CinemaRow.css'


const CinemaRow = ({ movie }) => {
    const [cinemas, setCinemas] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/theatre')
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                } else {
                    setCinemas(res.data);
                }
            });
    })

    return (
        <div className="movie-page-cinemas-container">You can watch {movie.title} in:
            {cinemas && (
                <div className="cinema-row">
                    {cinemas.map((cinema) => {
                        return <div className="cinema"><h1>{cinema.name}</h1><p>{cinema.address}</p></div>
                    })}
                </div>
            )}
        </div>
    )
}

export default CinemaRow