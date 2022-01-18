import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../authHeader";
import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";

const MovieData = ({ movie }) => {
    const [moviePicturePath, setMoviePicturePath] = useState();
    const [moviePosterPath, setMoviePosterPath] = useState();
    const [trailer, setTrailer] = useState("");
    const [user, setUser] = useState({});
    const [newTitle, setNewTitle] = useState(movie.title);
    const [newDate, setNewDate] = useState(movie.date);
    const [newDesc, setNewDesc] = useState(movie.description);
    const [newTrailer, setNewTrailer] = useState();
    const [toEdit, setEdit] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const history = createBrowserHistory();


    const getTrailer = () => {
        axios
            .get(`http://localhost:8080/movies/trailer/${movie.id}`)
            .then(res => {
                setTrailer(res.data);
                setNewTrailer(res.data);
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

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios
                .get("http://localhost:8080/user/account", { headers: authHeader(), })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    } else {
                        setUser(res.data);
                    }
                });
        }
    })

    const handleNewTitleChange = (e) => {
        e.preventDefault();

        setNewTitle(e.target.value);
    }

    const handleNewDateChange = (e) => {
        e.preventDefault();

        setNewDate(e.target.value);
    }
    const handleNewDescriptionChange = (e) => {
        e.preventDefault();

        setNewDesc(e.target.value);
    }

    const handleNewTrailerChange = (e) => {
        e.preventDefault();

        setNewTrailer(e.target.value);
    }

    const handleEditStateChange = (e) => {
        e.preventDefault();

        setEdit(true);
        setDelete(false);

        console.log(toEdit, toDelete);
    }

    const handleDeleteStateChange = (e) => {
        e.preventDefault();

        setEdit(false);
        setDelete(true);

        console.log(toEdit, toDelete);
    }

    const updateMovie = (id, title, releaseDate, description, trailer) => {
        axios
            .post(`http://localhost:8080/admin/edit/movie`, {
                id,
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

    const deleteMovie = () => {
        axios
            .post(`http://localhost:8080/admin/remove/movie/${movie.id}`, {},  { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                }
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (toEdit === true) {
            if (newTitle !== "" && newDate !== "" && newDesc !== "" && newTrailer !== "") {
                updateMovie(movie.id, newTitle, newDate, newDesc, newTrailer);
                history.push("/");
                window.alert(`${movie.title} has been updated!`);
                window.location.reload();

            }
            else {
                window.alert("Fill in all fields.")
            }
        } else if (toDelete === true) {
            if(window.confirm(`Are you sure you want to delete ${movie.title}?`)){
                deleteMovie();
                history.push("/");
                window.alert(`${movie.title} has been removed!`);
                window.location.reload();
            }
        }
    }

    return (
        <form method='post' id='reservation-form' onSubmit={handleFormSubmit}>
            <div className="movie-page-container">
                <img src={moviePicturePath} className="movie-page-background-image" />
                <div className="movie-page-box">
                    <div className="movie-page-photo"><img src={moviePosterPath} /></div>
                    <div className="movie-page-info">

                        <h1>{movie.title}</h1> {user.role === "ADMIN" ? <input type="text" placeholder="New title" onChange={handleNewTitleChange} /> : <></>}
                        <h3>Release date: {movie.releaseDate}</h3> {user.role === "ADMIN" ? <>ENTER NEW DATE <input type="date" onChange={handleNewDateChange} /></> : <></>}
                        <p>{movie.description}</p>{user.role === "ADMIN" ? <> <textarea placeholder="New description" onChange={handleNewDescriptionChange} /><br /></> : <></>}
                        <button className="trailer-button"><a href={trailer}>Watch trailer</a></button> {user.role === "ADMIN" ? <input type="text" placeholder="New trailer URL" onChange={handleNewTrailerChange} /> : <></>}
                        {user.role === "ADMIN" ? <><input type="radio" className="update-button" value="update" name="update" checked={toEdit} id="update" onClick={handleEditStateChange}/><label for="update">Update</label></> : <></>}
                        {user.role === "ADMIN" ? <><input type="radio" className="delete-button" value="Delete movie" value="delete" checked={toDelete} name="delete" id="update" onClick={handleDeleteStateChange}/> <label for="delete">Delete</label></> : <></>}
                        {user.role === "ADMIN" ? <input type="submit" className="update-button" value="Submit changes" /> : <></>}

                    </div>
                </div>
            </div>
        </form>
    )
}

export default MovieData