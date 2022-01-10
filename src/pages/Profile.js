import authHeader from "../authHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileData from "../components/ProfileData";
import ProfileEdit from "../components/ProfileEdit";
import './Profile.css'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import ReservationHistory from "../components/ReservationHistory";

const Profile = () => {
    return (
        <div className="profile-page-container">
            <Router>
                <ProfileData />
                <Switch>
                    <Route exact path='/settings' exact component={ProfileEdit} />
                    <Route exact path='/profile' exact component={ReservationHistory} />
                </Switch>
            </Router>
        </div>
    )
}

export default Profile