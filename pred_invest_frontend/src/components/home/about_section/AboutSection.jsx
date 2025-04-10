import aboutImg from "@/assets/img/home/about-img.png";
import {Link} from "react-router-dom";
import "./AboutSection.css"


function AboutSection() {
    return (
        <section className="about-section" id="about_section">
            <div className="container  ">
                <div className="heading-container heading-center">
                    <h2>
                        About <span>Us</span>
                    </h2>
                    <p>
                        PredInvest integrates data from various sources
                        and visualizes it with interactive charts, helping you quickly assess the current state of
                        your assets and their growth potential.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="img-box">
                            <img src={aboutImg} alt=""/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <h3>
                                We Are PredInvest
                            </h3>
                            <p>
                                PredInvest’s main purpose is to provide investors and analysts with a comprehensive
                                set of tools to evaluate portfolio structure, assess risks, and identify growth
                                opportunities.
                            </p>
                            <p>
                                The application takes into account key parameters (returns,
                                volatility, industry sector, and regional diversification) and generates
                                personalized recommendations to help optimize your investments
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;