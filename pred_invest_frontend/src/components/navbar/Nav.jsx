import {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import UserBar from "./userbar/UserBar/UserBar";
import "./Navbar.css";
import UserContext from "@/context/auth-context.jsx";
import { Link as AnchorLink} from 'react-scroll' ;

export default function Nav() {

    const {isAuth, userData} = useContext(UserContext);
    const getNavLinks = () => {
        if (isAuth) {
            return (
                <li className="d-flex gap-3">
                    <Link className="nav-link text-light" aria-current="page" to="/dashboards">
                        Dashboards
                    </Link>
                </li>
            );
        }
        return (
            <Fragment>
                <li className="d-flex gap-3">
                    <AnchorLink className="nav-link text-light" to="services" smooth={true} duration={100}>
                        Services
                    </AnchorLink>
                </li>
                <li className="d-flex gap-3">
                    <AnchorLink className="nav-link text-light" to="about" smooth={true} duration={100}>
                        About us
                    </AnchorLink>
                </li>
                <li className="d-flex gap-3">
                    <AnchorLink className="nav-link text-light" to="contacts" smooth={true} duration={100}>
                        Contacts
                    </AnchorLink>
                </li>
            </Fragment>
        );
    };

    return (
        <nav className="navbar custom-navbar navbar-expand-md">
            <div className="container">
                <Link className="navbar-brand text-light" to="/">
                    PredInvest
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">{getNavLinks()}</ul>
                    <UserBar/>
                </div>
            </div>
        </nav>
    );
}
