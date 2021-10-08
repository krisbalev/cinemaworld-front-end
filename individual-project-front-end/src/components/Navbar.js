import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <div class="logo"><Link to="/">CinemaWorld</Link></div>
            <ul class="links">
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;