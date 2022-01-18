import './Reservation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../authHeader';
import { createBrowserHistory } from "history";

const ReservationPage = () => {
    const [movies, setMovies] = useState(null);
    const [theatres, setTheatres] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedTheatre, setSelectedTheatre] = useState("");
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isSelectedMorning, setSelectMorning] = useState(false);
    const [isSelectedEvening, setSelectEvening] = useState(false);
    const [isSelectedNight, setSelectNight] = useState(false);
   
    const history = createBrowserHistory();


    useEffect(() => {
        const getMovies = () => {
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

        const getTheatres = () => {
            axios
                .get("http://localhost:8080/theatre")
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    } else {
                        setTheatres(res.data);
                    }
                });
        }
        getMovies();
        getTheatres();
    }, []);

    const reserve = (movieName, date, time, numberOfTickets, theatreName) => {
        axios
            .post("http://localhost:8080/reservations/reserve", {
                movieName,
                date,
                time,
                numberOfTickets,
                theatreName
            }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                } else {
                    console.log(movieName, date, time, numberOfTickets, theatreName);
                }
            })
    }
   
    const handleMovieChange = (e) => {
        e.preventDefault();

        setSelectedMovie(e.target.value);
    }

    const handleTheatreChange = (e) => {
        e.preventDefault();

        setSelectedTheatre(e.target.value);
    }

    const handleHourChange = (e) => {
        e.preventDefault();

        setTime(e.target.value);
        switch(e.target.value){
            case "10:00:00":
                setSelectMorning(true);
                setSelectEvening(false);
                setSelectNight(false);
                break;
            case "15:00:00":
                setSelectMorning(false);
                setSelectEvening(true);
                setSelectNight(false);
                break;
            case "21:30:00":
                setSelectMorning(false);
                setSelectEvening(false);
                setSelectNight(true);
                break;
        }
    }

    const handleNumberOfTicketsChange = (e) => {
        e.preventDefault();

        setNumberOfTickets(e.target.value);
    }

    const handleDateChange = (e) => {
        e.preventDefault();

        setDate(e.target.value);
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (selectedMovie !== "" && selectedTheatre !== "" && date !== "" && time !== "" && numberOfTickets !== 0) {
            if(window.confirm(`Make a reservation for ${selectedMovie} at ${selectedTheatre} for ${time} on ${date} with ${numberOfTickets} tickets ?`)) {
                reserve(selectedMovie, date, time, numberOfTickets, selectedTheatre);
                history.push("/");
                window.location.reload();
                window.alert("Reservation successful!")
            }
        } else {
            window.alert("Please fill in all the required fields.")
        } 
        
       
    }

    return (
        <form method='post' id='reservation-form' onSubmit={handleFormSubmit}>
            <div className="reservation-page">
                <h1>Make a Reservation</h1>

                <div className="reservation-movie-choice">
                    {movies && (
                        <select className='reservation-select' name="reservation-movies" id="reservation-movies" onChange={handleMovieChange}>
                            <option className='select-option' disabled value="null" selected="selected">Choose a movie</option>
                            {movies.map((movie) => {
                                return <option className='select-option' value={movie.title}>{movie.title}</option>
                            })}
                        </select>
                    )}
                </div>

                <div className="reservation-theatre-choice">
                    {theatres && (
                        <select className='reservation-select' name="reservation-theatres" id="reservation-thatres" onChange={handleTheatreChange}>
                            <option className='select-option' disabled value="null" selected="selected">Choose a cinema</option>
                            {theatres.map((theatre) => {
                                return <option className='select-option' value={theatre.name}>{theatre.name}</option>
                            })}
                        </select>
                    )}
                </div>

                <input className='calendar' type="date" onChange={handleDateChange} />

                <div className='hour-choice-container'>
                    <h2>Choose a time slot</h2>
                    <input className={isSelectedMorning === true ? 'hour-choice selected' : 'hour-choice'} value="10:00:00" onClick={handleHourChange} />
                    <input className={isSelectedEvening === true ? 'hour-choice selected' : 'hour-choice'} value="15:00:00" onClick={handleHourChange} />
                    <input className={isSelectedNight === true ? 'hour-choice selected' : 'hour-choice'} value="21:30:00" onClick={handleHourChange} />
                </div>

                <div className="reservation-tickets">
                    <input placeholder='Enter the number of tickets you want to reserve' min="1" className='reservation-select' type="number" onChange={handleNumberOfTicketsChange} />
                </div>

                <input className='btn reservation-btn' type="submit" value="Finish reservation" id="btn-reservtion-submit" />

            </div>
        </form>
    )
}

export default ReservationPage