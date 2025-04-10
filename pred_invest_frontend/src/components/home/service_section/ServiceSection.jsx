import {Component} from "react";
import serviceImg1 from "@/assets/img/home/s1.png";
import {Link} from "react-router-dom";
import serviceImg2 from "@/assets/img/home/s2.png";
import serviceImg3 from "@/assets/img/home/s3.png";
import "./ServiceSection.css"


function ServiceSection() {
    return (
        <section className="service-section" id="service_section">
            <div className="service-container">
                <div className="container ">
                    <div className="heading-container heading-center">
                        <h2>
                            Our Services
                        </h2>
                        <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority
                            have
                            suffered alteration
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={serviceImg1} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Currency Wallet
                                    </h5>
                                    <p>
                                        PredInvest offers a convenient module for managing currency assets in your
                                        investment portfolio. Integration with leading financial platforms enables
                                        you to monitor exchange rate fluctuations.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={serviceImg2} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Security Storage
                                    </h5>
                                    <p>
                                        Data security and confidentiality are our top priorities. Thanks to
                                        multi-level protection mechanisms, your investment data is securely
                                        protected and always accessible in your personal account.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={serviceImg3} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Expert Support
                                    </h5>
                                    <p>
                                        Our team of experts is ready to answer any questions and assist you in
                                        selecting optimal investment strategies. Receive personalized
                                        recommendations and portfolio management advice based on the latest market
                                        trends.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default ServiceSection;