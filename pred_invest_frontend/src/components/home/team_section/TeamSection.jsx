import {Component} from "react";
import teamImg1 from "@/assets/img/home/team1.jpg";
import {Link} from "react-router-dom";
import teamImg2 from "@/assets/img/home/team2.jpg";
import teamImg3 from "@/assets/img/home/team3.jpg";
import "./TeamSection.css"


function TeamSection() {
    return (
        <section className="team-section" id="team_section">
            <div className="container-fluid">
                <div className="heading-container heading-center">
                    <h2>
                        Our Team
                    </h2>
                </div>

                <div className="team-container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={teamImg1} alt="" style={{ transform: "rotate(-90deg);" }}/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Berdinskikh Nikita
                                    </h5>
                                    <p>
                                        Data analysis and preprocessing
                                    </p>
                                </div>
                                <div className="social-box">
                                    <Link to="https://t.me/berrnk">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                        </svg>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={teamImg2} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Peschanskiy Dmitry
                                    </h5>
                                    <p>
                                        FullStack Development
                                    </p>
                                </div>
                                <div className="social-box">
                                    <Link to="https://t.me/m1stery18">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                        </svg>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={teamImg3} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Pakhomov Eugene
                                    </h5>
                                    <p>
                                        Machine Learning
                                    </p>
                                </div>
                                <div className="social-box">
                                    <Link to="https://t.me/flexorcist">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamSection