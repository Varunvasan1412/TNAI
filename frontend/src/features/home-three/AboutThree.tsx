import React from 'react';
import { Link } from 'react-router';

import aboutThreeImg1 from '../../assets/images/resources/about-three-img-1.jpg';
import aboutThreeImg2 from '../../assets/images/resources/about-three-img-2.jpg';
import aboutThreeShape1 from '../../assets/images/shapes/about-three-shape-1.png';
import aboutThreeClientImg1 from '../../assets/images/resources/about-three-client-img-1.jpg';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';
import CounterUp from '../../components/elements/CounterUp';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface ChecklistItem {
    id: number;
    text: string;
}

interface FeaturePoint {
    id: number;
    icon: string;
    title: string;
    text: string;
}

interface ClientInfo {
    name: string;
    role: string;
    image: string;
}

const checklistItems: ChecklistItem[] = [
    { id: 1, text: 'Invest in a quality case to protect your device.' },
    { id: 2, text: 'Until recently the prevailin view assumed' },
];

const featurePoints: FeaturePoint[] = [
    {
        id: 1,
        icon: 'icon-affordable-price',
        title: 'Affordable Price',
        text: 'The wise man therefore always holds.',
    },
    {
        id: 2,
        icon: 'icon-setting',
        title: '100% Guarantee',
        text: 'The wise man therefore always holds.',
    },
    {
        id: 3,
        icon: 'icon-services',
        title: '24/7 Our Service',
        text: 'The wise man therefore always holds.',
    },
];

const clientInfo: ClientInfo = {
    name: 'Mark Hander',
    role: 'Founder & CEO',
    image: aboutThreeClientImg1,
};

const   AboutThree: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext();
    return (
        <SectionWrapper id='about' className="about-three">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <FadeInAdvanced
                            className="about-three__left"
                            delay={100}
                            variant='slideInLeft' 
                        >
                            <div className="about-three__img-box">
                                <div className="about-three__img">
                                    <img src={aboutThreeImg1} alt="About us main" />
                                    <div className="about-three__video-link">
                                        <Link
                                            to="#"
                                            onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")}
                                            className="video-popup"
                                        >
                                            <div className="about-three__video-icon">
                                                <span className="icon-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="about-three__img-2">
                                    <img src={aboutThreeImg2} alt="About us secondary" />
                                </div>
                                <div className="about-three__shape-1">
                                    <img src={aboutThreeShape1} alt="" />
                                </div>
                                <div className="about-three__shape-2"></div>
                                <div className="about-three__experience-box">
                                    <div className="about-three__count-box">
                                        <h3 className="odometer" ><CounterUp ending={25}/></h3>
                                        <span>+</span>
                                    </div>
                                    <p className="about-three__experience-text">
                                        Years Experiences Maintenance Services
                                    </p>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    </div>

                    <div className="col-xl-6">
                        <div className="about-three__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>About Us
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation>General Auto Repair & Car This Maintenance Place</TextAnimation>
                                </h3>
                            </div>

                            <p className="about-three__text">
                                The wise man therefore always holds in these matters to this principle of
                                selection. He rejects pleasures to secure other greater pleasures.
                            </p>

                            <ul className="about-three__points-list list-unstyled">
                                {checklistItems.map((item) => (
                                    <li key={item.id}>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>{item.text}</p>
                                    </li>
                                ))}
                            </ul>

                            <ul className="about-three__points-two list-unstyled">
                                {featurePoints.map((point) => (
                                    <li key={point.id}>
                                        <div className="about-three__points-two-icon">
                                            <span className={point.icon}></span>
                                        </div>
                                        <h3 className="about-three__points-two-title">{point.title}</h3>
                                        <p className="about-three__points-two-text">{point.text}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="about-three__btn-and-client-box">
                                <div className="about-three__btn-box">
                                    <Link to="/about" className="thm-btn">
                                        About More<span className="icon-arrow-right"></span>
                                    </Link>
                                </div>
                                <div className="about-three__client-box">
                                    <div className="about-three__client-img">
                                        <img src={clientInfo.image} alt={clientInfo.name} />
                                    </div>
                                    <div className="about-three__client-content">
                                        <h4>{clientInfo.name}</h4>
                                        <p>{clientInfo.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AboutThree;