import {Fragment} from "react";
import ServiceSection from "../../components/home/service_section/ServiceSection";
import AboutSection from "../../components/home/about_section/AboutSection";
import TeamSection from "../../components/home/team_section/TeamSection";
import SliderSection from "../../components/home/slider_section/SliderSection";
import "./Home.css";
import {Element} from 'react-scroll' ;

export default function Home({isAuthorized}) {
    return (
        <Fragment>
            <SliderSection/>
            <Element name="services">
                <ServiceSection/>
            </Element>
            <Element name="about">
                <AboutSection/>
            </Element>
            <Element name="contacts">
                <TeamSection/>
            </Element>

        </Fragment>
    );
}
