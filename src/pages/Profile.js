import authHeader from "../authHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileData from "../components/ProfileData";
import ProfileEdit from "../components/ProfileEdit";
import './Profile.css'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

const Profile = () => {
    return (
        <div className="profile-page-container">
            <Router>
                <ProfileData />
                <Switch>
                    <Route exact path='/profile' exact component={ProfileEdit} />
                </Switch>
            </Router>
        </div>
    )
}

export default Profile