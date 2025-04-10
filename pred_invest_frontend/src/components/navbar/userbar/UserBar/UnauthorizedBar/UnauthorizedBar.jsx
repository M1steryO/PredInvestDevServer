import {Link} from "react-router-dom";

export default function UnauthorizedBar() {
    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="d-flex gap-3">
                <Link className="nav-link text-light login-btn" to="/login">
                    Login
                </Link>
                <Link className="nav-link text-light signup-btn" to="/register">
                    Sign up
                </Link>
            </li>
        </ul>
    );
}
