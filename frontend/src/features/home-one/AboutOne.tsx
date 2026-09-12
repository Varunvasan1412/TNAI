import React from 'react';
import { Link } from 'react-router';

// Scientist working with electrochemical equipment in lab
import aboutOneImg1 from '../../assets/images/about/about1.png';
// Close-up of lab glassware / research setup
import aboutOneImg2 from '../../assets/images/about/about2.png';
import aboutOneShape2 from '../../assets/images/shapes/about-one-shape-2.png';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import CounterUp from '../../components/elements/CounterUp';
import TextAnimation from '../../components/elements/TextAnimation';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface PointItem {
    id: number;
    iconClass: string;
    title: string;
    text: string;
}

interface CheckItem {
    id: number;
    text: string;
}

const pointsData: PointItem[] = [
    {
        id: 1,
        iconClass: 'icon-setting',
        title: 'Custom Wallpaper Solutions',
        text: 'We design and supply custom high-definition wallpapers, textured wall coverings, and bespoke wall murals.',
    },
    {
        id: 2,
        iconClass: 'icon-happy-customer',
        title: 'Expert Interior Support',
        text: 'Dedicated design team to help homeowners, architects, and interior designers choose the perfect wall decor.',
    },
];

const checkItems: CheckItem[] = [
    { id: 1, text: '3D embossed & textured wallpaper collections.' },
    { id: 2, text: 'Custom printed murals for homes & commercial spaces.' },
    { id: 3, text: 'Durable, eco-friendly, and washable wall coverings.' },
];


export type SecProp = {
    secClass?: string
}
const AboutOne: React.FC<SecProp> = ({ secClass = "" }) => {
    const { handleVideoClick } = useRsistoreContext();
    return (
        <SectionWrapper className={`about-one ${secClass}`} id='aboutOne'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <FadeInAdvanced
                            className="about-one__left"
                            delay={100}
                            variant='slideInLeft'
                        >
                            <div className="about-one__img-box">
                                <div className="about-one__img">
                                    <img src={aboutOneImg1} alt="Wallpaper Store Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="about-one__img-2">
                                    <img src={aboutOneImg2} alt="Luxury Wallpaper Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="about-one__shape-2 float-bob-y">
                                    <img src={aboutOneShape2} alt="" />
                                </div>
                                <div className="about-one__experience-box">
                                    <div className="about-one__count-box">
                                        <h3 className="odometer" data-count="25"><CounterUp ending={25} /> </h3>
                                        <span>+</span>
                                    </div>
                                    <p className="about-one__experience-text">
                                        Years of Decor Excellence
                                    </p>
                                </div>
                                <div className="about-one__shape-1 float-bob-x"></div>
                                {/* <div className="about-one__dotted-circle rotate-me">
                                    <img src={aboutThreeShape1} alt="" />
                                </div> */}
                            </div>
                        </FadeInAdvanced>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-one__right">
                            <div className="section-title sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>ABOUT US
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation animationStyle='style2'>
                                        Welcome To The Wall Project – Wallpaper Store
                                    </TextAnimation>
                                </h3>
                            </div>
                            <p className="about-one__text">
                                The Wall Project - Wallpaper Store provides premium custom wallpapers,
                                wall coverings, decorative interior solutions, and custom wall designs
                                for residential, commercial, and architectural spaces.
                            </p>
                            <div className="about-one__points-box">
                                <ul className="about-one__points list-unstyled">
                                    {pointsData.map((point) => (
                                        <li key={point.id}>
                                            <div className="icon">
                                                <span className={point.iconClass}></span>
                                            </div>
                                            <div className="content">
                                                <h4>{point.title}</h4>
                                                <p>{point.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <ul className="about-one__points-two list-unstyled">
                                {checkItems.map((item) => (
                                    <li key={item.id}>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="about-one__btn-and-video">
                                <div className="about-one__btn-box">
                                    <Link to="/about" className="thm-btn">
                                        Discover More<span className="icon-arrow-right"></span>
                                    </Link>
                                </div>
                                <div className="about-one__video-box">
                                    <div className="about-one__video-link">
                                        <a
                                            onClick={(e) => handleVideoClick(e, "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-41544-large.mp4")}
                                            className="video-popup"
                                        >
                                            <div className="about-one__video-icon">
                                                <span className="icon-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </a>
                                    </div>
                                    <p className="about-one__video-text">Watch Our Intro</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AboutOne;