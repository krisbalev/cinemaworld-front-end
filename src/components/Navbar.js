import './Navbar.css';
import { Link } from "react-router-dom";
import Profile from '../pages/Profile';

const Navbar = props => {
    return (
        <nav>
            <div className="links">
                <li><a href="/#movies">MOVIES</a></li>
                {localStorage.getItem('accessToken') ?
                        <li><Link to="/discussion">DISCUSSION</Link></li>
                    :
                    <div></div>
                }
            </div>
            <div class="logo"><a href="/#home">CinemaWorld</a></div>
            <div class="links">
                <div className="profile-button">
                    {localStorage.getItem('accessToken') ?
                        <li><Link to="/profile" onClick={Profile}>PROFILE</Link></li>
                        :
                        <div></div>
                    }
                </div>

                <div class="log-button">
                    {localStorage.getItem('accessToken') ?
                        <li><Link to="/login" onClick={props.logout}>LOGOUT</Link></li>
                        :
                        <li><Link to="/login">LOGIN</Link></li>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;