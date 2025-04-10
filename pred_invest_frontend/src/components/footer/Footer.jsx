import {Component} from "react";
import {Link} from "react-router-dom";
import "./Footer.css"

function Footer() {
    return (
        <section className="footer-section">
            <div className="container">
                <p>
                    © <span id="displayYear">2025</span> All Rights Reserved By
                    <Link to="/"> PredInvest</Link>
                </p>
            </div>
        </section>
    )
}

export default Footer;