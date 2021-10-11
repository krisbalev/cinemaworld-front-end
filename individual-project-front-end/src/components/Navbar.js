import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="links">
                <li><Link to="/">HOME</Link></li>
            </div>
            <div class="logo"><Link to="/">CinemaWorld</Link></div>
            <div class="links">
                <li><Link to="/">LOGIN</Link></li>
            </div>
        </nav>
    );
}

export default Navbar;