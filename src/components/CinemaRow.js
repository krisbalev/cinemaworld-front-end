import axios from "axios";
import { useEffect, useState } from "react"


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
                        return <h1>{cinema.name}</h1>
                    })}
                </div>
            )}
        </div>
    )
}

export default CinemaRow