import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="default-links">
                <li><Link to="/">Home</Link></li>
            </div>
            <div class="logo"><Link to="/">CinemaWorld</Link></div>
            <ul class="links">
                <li><Link to="/">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;