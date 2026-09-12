import React from 'react';
import { Link } from 'react-router';

import aboutTwoShape1 from '../../assets/images/shapes/about-two-shape-1.png';
import aboutTwoShape2 from '../../assets/images/shapes/about-two-shape-2.png';
import aboutTwoImg1 from '../../assets/images/resources/about-two-img-1.jpg';
import aboutTwoImg2 from '../../assets/images/resources/about-two-img-2.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import CounterUp from '../../components/elements/CounterUp';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface PointItem {
    id: number;
    iconClass: string;
    label: string;
}

const pointsList: PointItem[] = [
    { id: 1, iconClass: 'icon-setting', label: 'Planning' },
    { id: 2, iconClass: 'icon-setting', label: 'Replacing' },
    { id: 3, iconClass: 'icon-setting', label: 'Installing' },
];

const AboutTwo: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext()
    return (
        <SectionWrapper id='about' className="about-two">
            <div className="about-two__shape-1 rotate-me">
                <img src={aboutTwoShape1} alt="" />
            </div>
            <div className="about-two__shape-2 float-bob-y">
                <img src={aboutTwoShape2} alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>About Our Company
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation> Heating & AC Installation <br /> Repair Company</TextAnimation>
                                </h3>
                            </div>
                            <p className="about-two__text-1">
                                Our Company Provide The Best <span>A/C</span> Service.
                            </p>
                            <ul className="about-two__points-list list-unstyled">
                                {pointsList.map((point) => (
                                    <li key={point.id}>
                                        <div className="icon">
                                            <span className={point.iconClass}></span>
                                        </div>
                                        <p>{point.label}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="about-two__text-2">
                                At <span>The Wall Project</span>, we are a team of highly skilled wallpaper and interior design specialists.
                                experience in the tech repair industry. Our expertise covers a broad spectrum of
                                devices, including Ac, laptops, desktops, smartphones, tablets, and more..
                            </p>
                            <div className="about-two__btn-box">
                                <Link to="/about" className="thm-btn">
                                    More About Us<span className="icon-arrow-right"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <FadeInAdvanced
                            className="about-two__right"
                            variant='slideInRight'
                            delay={100}
                        >
                            <div className="about-two__img-box">
                                <div className="about-two__img">
                                    <img src={aboutTwoImg1} alt="" />
                                </div>
                                <div className="about-two__img-2">
                                    <img src={aboutTwoImg2} alt="" />
                                </div>
                                <div className="about-two__experience-box">
                                    <div className="about-two__count-box">
                                        <h3 className="odometer" ><CounterUp ending={25}></CounterUp></h3>
                                        <span>+</span>
                                    </div>
                                    <p className="about-two__experience-text">Years Of Experience</p>
                                </div>
                                <div className="about-two__circle-bdr rotate-me"></div>
                                <div className="about-two__video-link">
                                    <Link
                                        to="#"
                                        className="video-popup"
                                        onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")}
                                    >
                                        <div className="about-two__video-icon">
                                            <span className="icon-play"></span>
                                            <i className="ripple"></i>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AboutTwo;