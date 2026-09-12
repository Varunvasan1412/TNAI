import React from 'react';
import { Link } from 'react-router';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import Progresbar from '../../components/elements/Progressbar';
import TextAnimation from '../../components/elements/TextAnimation';


interface ProgressItem {
    id: number;
    title: string;
    percent: number;
}

interface ButtonItem {
    id: number;
    label: string;
    path: string;
    className: string;
}

const progressItems: ProgressItem[] = [
    {
        id: 1,
        title: 'Maintenance',
        percent: 76,
    },
    {
        id: 2,
        title: 'Skilled Professionals',
        percent: 90,
    },
    {
        id: 3,
        title: 'System Maintenance',
        percent: 92,
    },
];

const buttonItems: ButtonItem[] = [
    {
        id: 1,
        label: 'Discover More',
        path: '/about',
        className: 'why-choose-three__btn thm-btn',
    },
    {
        id: 2,
        label: 'Free Estimate',
        path: '/contact',
        className: 'why-choose-three__btn-two thm-btn',
    },
];

const WhyChooseThree: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext()
    return (
        <section className="why-choose-three">
            <FadeInAdvanced
                className="why-choose-three__bg "
                delay={100}
                variant='slideInLeft'
            >
                <div className="why-choose-three__video-link">
                    <Link
                        onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")}
                        to={"#"}
                        className="video-popup"
                    >
                        <div className="why-choose-three__video-icon">
                            <span className="fas fa-play"></span>
                            <i className="ripple"></i>
                        </div>
                    </Link>
                </div>
            </FadeInAdvanced>

            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-5"></div>
                    <div className="col-xl-6 col-lg-7">
                        <div className="why-choose-three__right">
                            <div className="section-title text-left sec-title-animation animation-style1">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Why Choose Us
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation>Trust an electrician when you don't know what to do</TextAnimation>
                                </h3>
                            </div>

                            <p className="why-choose-three__text-1">
                                The wise man therefore always holds in these matters to this principle of selection.
                                He rejects pleasures to secure other greater pleasures, or else he endures pains to
                                avoid worse pains to the selection point.
                            </p>

                            <div className="why-choose-three__progress-box">
                                <ul className="why-choose-three__progress-list list-unstyled">
                                     {progressItems.map((item, i) => (
                                        <Progresbar key={i} title={item?.title} value={item.percent} />
                                    ))}
                                </ul>
                            </div>

                            <div className="why-choose-three__btn-box">
                                {buttonItems.map((btn) => (
                                    <Link key={btn.id} to={btn.path} className={btn.className}>
                                        {btn.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseThree;