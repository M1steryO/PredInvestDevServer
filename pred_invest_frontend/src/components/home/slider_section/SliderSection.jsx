import {Link, useNavigate} from "react-router-dom";
import sliderImg from "@/assets/img/home/slider-img.png"
import {Component, useContext} from "react";
import "./SliderSection.css"
import AuthContext from "@/context/auth-context.jsx";


function SliderSection() {
    const {isAuth} = useContext(AuthContext);
    return (
        <section className="slider-section" id="slider-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="detail-box">
                            <h1>
                                PredInvest
                            </h1>
                            <p>
                                PredInvest is a modern tool for analyzing and optimizing investment portfolios. It
                                helps investors and analysts access aggregated information about asset structures,
                                potential risks, and expected returns, providing clear data visualization from
                                multiple sources.

                            </p>
                            {
                                !isAuth && <div className="btn-box">
                                    <Link to="/register" className="custom-btn">
                                        Start now
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="img-box">
                            <img src={sliderImg} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}


export default SliderSection