import './ReservationHistory.css'
import axios from "axios";
import { useEffect, useState } from "react"
import authHeader from "../authHeader";

const ReservationHistory = () => {
    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);

    const getUser = () => {
        axios
            .get("http://localhost:8080/user/account", { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                } else {
                    setUser(res.data);
                }
            })
    }

    const getResertvations = () => {
        axios
            .get("http://localhost:8080/reservations", { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                } else {
                    setReservations(res.data);
                }
            })
    }

    useEffect(() => {
        getUser();
        getResertvations();
    }, []);

    return (
        <div className="reservation-container">
            <h1 className="edit-profile-header">Reservation History</h1>
            {reservations && (
                <div className='reservation-box'>
                    <table className="reservations-box">

                        <tr className="reservation-box-headers">
                            <td>Movie</td>
                            <td>Cinema</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Number of Tickets</td>
                        </tr>
                        {reservations.map((reservation) => {
                            return <tr className="reservation-box-item">
                                <td>{reservation.movieName}</td>
                                <td>{reservation.theatreName}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.time}</td>
                                <td className='amount'>{reservation.numberOfTickets}</td>
                            </tr>
                        })}
                    </table>
                </div>
            )}
            <a href='/reserve'>Start a new reservation.</a>
        </div>
    )
}

export default ReservationHistory