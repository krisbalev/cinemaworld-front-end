
import "./ProfileData.css";
import pic from "../images/alt.jpg";
import authHeader from "../authHeader";
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import profileIcon from '../images/profile-icon.png'
import emailIcon from '../images/email-icon.png'

function ProfileData() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = () => {
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
    getData();
  }, []);


  return (
      <div class="profile-data-card">
        <div className="profile-picture-box">
          <img src={pic} alt="" />
        </div>
        <div className="profile-details">
          <h1>{user.firstName} {user.lastName}</h1>

          <div className="profile-detail">
            <img src={profileIcon} />
            <p>{user.username}</p>
          </div>
          <div className="profile-detail">
            <img src={emailIcon} />
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-edit-button">
        <Link to="/profile" className="edit-button">Reservation History</Link> | <Link to="/settings" className="edit-button">Settings</Link>
        </div>
      </div>
  );
}

export default ProfileData;
