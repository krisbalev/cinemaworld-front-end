import './AdminPage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../authHeader';
import { createBrowserHistory } from "history";

const AdminPage = () => {
    const [movies, setMovies] = useState(null);
    const [theatres, setTheatres] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedMovieObject, setSelectedMovieObject] = useState({});
    const [selectedTheatre, setSelectedTheatre] = useState("");
    const [selectedTheatreObject, setSelectedTheatreObject] = useState({});
    const [toAdd, setAdd] = useState(false);
    const [toEdit, setEdit] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState(false);
    const [selectedCinemas, setSelectedCinemas] = useState(false);
    const [addMovieDate, setDate] = useState("");
    const [addMovieTitle, setTitle] = useState("");
    const [addMovieDescription, setDescription] = useState("");
    const [addMovieTrailer, setTrailer] = useState("");
    const [addCinemaName, setCinemaName] = useState("");
    const [addCinemaAddress, setCinemaAddress] = useState("");
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
    

    const handleMovieChange = (e) => {
        e.preventDefault();

        setSelectedMovie(e.target.value);

        for (let i = 0; e.target.value === movies[i].title; i++) {
            setSelectedMovieObject = movies[i];
        }
    }

    const handleTheatreChange = (e) => {
        e.preventDefault();

        setSelectedTheatre(e.target.value);

        // for(let i = 0; e.target.value === theatres[i].name; i++){
        //     setSelectedTheatreObject = theatres[i];
        // }
    }

    const handleAddMovieTitle = (e) => {
        e.preventDefault();

        setTitle(e.target.value);
    }

    const handleAddMovieDescription = (e) => {
        e.preventDefault();

        setDescription(e.target.value);
    }

    const handleAddMovieDate = (e) => {
        e.preventDefault();

        setDate(e.target.value);
    }

    const handleAddMovieTrailer = (e) => {
        e.preventDefault();

        setTrailer(e.target.value);
    }

    const handleActionChange = (e) => {
        e.preventDefault();

        if (e.target.value === "add") {
            setAdd(true);
            setEdit(false);
            setDelete(false);
        } else if (e.target.value === "edit") {
            setAdd(false);
            setEdit(true);
            setDelete(false);
        } else if (e.target.value === "delete") {
            setAdd(false);
            setEdit(false);
            setDelete(true);
        } else {
            setAdd(false);
            setEdit(false);
            setDelete(false);
        }
    }

    const handleOptionChange = (e) => {
        e.preventDefault();

        if (e.target.value === "movies") {
            setSelectedMovies(true);
            setSelectedCinemas(false);
        } else if (e.target.value === "cinemas") {
            setSelectedMovies(false);
            setSelectedCinemas(true);
        } else {
            setSelectedMovies(false);
            setSelectedCinemas(false);
        }
    }

    const handleAddCinemaNameChange = (e) => {
        e.preventDefault();

        setCinemaName(e.target.value);
    }

    const handleAddCinemaAddressChange = (e) => {
        e.preventDefault();

        setCinemaAddress(e.target.value);
    }

    const addMovie = (title, releaseDate, description, trailer) => {
        axios
            .post("http://localhost:8080/admin/add/movie", {
                title,
                releaseDate,
                description,
                trailer
            }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                }
            })
    }

    const addCinema = (name, address) => {
        axios
            .post("http://localhost:8080/admin/add/theatre", {
                name,
                address
            }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                }
            })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (toAdd === true) {
            if (selectedMovies === true) {
                if (addMovieTitle !== "" && addMovieDescription !== "" && addMovieDate !== "" && addMovieTrailer !== "") {
                    addMovie(addMovieTitle, addMovieDate, addMovieDescription, addMovieTitle);
                    history.push("/");
                    window.alert(`${addMovieTitle} has been added`);
                    window.location.reload();
                } else {
                    window.alert("Fill in all fields.")

                }
            } else if (selectedCinemas === true) {
                if (addCinemaName !== "" && addCinemaAddress !== "") {
                    addCinema(addCinemaName, addCinemaAddress);
                    history.push("/");
                    window.alert(`${addCinemaName} has been added`);
                    window.location.reload();
                } else {
                    window.alert("Fill in all fields.")
                }
            }
        }


    }

    return (
        <form method='post' id='reservation-form' onSubmit={handleFormSubmit}>
            <div className='admin-page'>
                <h1>Admin CRUD page</h1>


                <div className='admin-settings'>
                    <div className='admin-choice-container'>
                        <div className='admin-choice'>
                            <select className='reservation-select' name="admin-action" id="admin-action" onChange={handleActionChange}>
                                <option className='select-option' disabled value="null" selected="selected">I want to:</option>
                                <option className='select-option' value="add">Add</option>
                                {/* <option className='select-option' value="edit">Edit</option>
                                <option className='select-option' value="delete">Delete</option> */}
                            </select>
                            <select className='reservation-select' name="admin-select" id="admin-select" onChange={handleOptionChange}>
                                <option className='select-option' disabled value="null" selected="selected">I want to make changes to:</option>
                                <option className='select-option' value="movies">Movies</option>
                                <option className='select-option' value="cinemas">Cinemas</option>
                            </select>
                        </div>
                    </div>

                    <div className='admin-page-body'>
                        {/* {toDelete === true ?
                            <div className="admin-choice-contaier">
                                {selectedMovies === true ?
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
                                    : selectedCinemas === true ?
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
                                        :
                                        <></>
                                }
                            </div>
                            : toAdd === true ? */}
                        <div className='admin-add'>
                            {selectedMovies === true ?
                                <div className='admin-add-movie'>
                                    <div class="admin-texbox">
                                        <input type="text" className="reservation-select" placeholder="Movie title" id="movie-title" name="movie-title" onChange={handleAddMovieTitle} /><br />
                                    </div>
                                    <div class="admin-texbox">
                                        <p>Release Date:</p>
                                        <input className='calendar' type="date" onChange={handleAddMovieDate} /><br />
                                    </div>
                                    <div class="admin-texbox">
                                        <input type="text" className="reservation-select" placeholder="Description" id="movie-description" name="movie-description" onChange={handleAddMovieDescription} /><br />
                                    </div>
                                    <div class="admin-texbox">
                                        <input type="text" className="reservation-select" placeholder="Trailer URL" id="movie-trailer" name="movie-trailer" onChange={handleAddMovieTrailer} /><br />
                                    </div>
                                </div>
                                : selectedCinemas === true ?
                                    <div className='admin-add-cinema'>
                                        <div class="admin-texbox">
                                            <input type="text" className="reservation-select" placeholder="Cinema name" id="cinema-name" name="cinema-name" onChange={handleAddCinemaNameChange} /><br />
                                        </div>
                                        <div class="admin-texbox">
                                            <input type="text" className="reservation-select" placeholder="Cinema address" id="cinema-address" name="cinema-address" onChange={handleAddCinemaAddressChange} /><br />
                                        </div>
                                    </div>
                                    :
                                    <></>

                            }
                        </div>
                        {/* : toEdit === true ?
                                    <div className="admin-choice-contaier">
                                        {selectedMovies === true ?
                                            <div className='edit-container'>
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
                                                <div className='admin-edit-movie'>
                                                    <div class="admin-texbox">
                                                        <input className="reservation-select" type="text" placeholder={selectedMovieObject.title} id="movie-title" name="movie-title" /><br />
                                                    </div>
                                                    <div class="admin-texbox">
                                                        <input className='calendar' type="date" placeholder={selectedMovieObject.date} /><br />
                                                    </div>
                                                    <div class="admin-texbox">
                                                        <input className="reservation-select" type="text" placeholder={selectedMovieObject.description} id="movie-description" name="movie-description" /><br />
                                                    </div>
                                                    <div class="admin-texbox">
                                                        <input className="reservation-select" type="text" placeholder="Trailer URL" id="movie-trailer" name="movie-trailer" /><br />
                                                    </div>
                                                </div>
                                            </div>
                                            : selectedCinemas === true ?
                                                <div className='edit-container'>
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
                                                    <div className='admin-edit-cinema'>
                                                        <div class="admin-texbox">
                                                            <input className="reservation-select" type="text" placeholder="Cinema name" id="cinema-name" name="cinema-name" /><br />
                                                        </div>
                                                        <div class="admin-texbox">
                                                            <input className="reservation-select" type="text" placeholder="Cinema address" id="cinema-address" name="cinema-address" /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                    :
                                    <></> */}


                    </div>
                    <input className='btn reservation-btn' type='submit' value="Finish changes" id="btn-admin-submit" />
                </div>
            </div>
        </form>
    )
}

export default AdminPage