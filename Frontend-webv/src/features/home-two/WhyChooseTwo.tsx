import React from 'react';

import whyChooseTwoShape2 from '../../assets/images/shapes/why-choose-two-shape-2.png';
import whyChooseTwoShape3 from '../../assets/images/shapes/why-choose-two-shape-3.png';
import whyChooseTwoImg1 from '../../assets/images/resources/why-choose-two-img-1.jpg';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import { Link } from 'react-router';
import TextAnimation from '../../components/elements/TextAnimation';
import useRsistoreContext from '../../components/context/useRsistoreContext';
import Progresbar from '../../components/elements/Progressbar';

interface PointItem {
    id: number;
    label: string;
}

interface ProgressItem {
    id: number;
    title: string;
    percent: number;
}

const pointsListOne: PointItem[] = [
    { id: 1, label: 'Expert Technicians' },
    { id: 2, label: 'Quick Turnaround' },
    { id: 3, label: 'Affordable Pricing' },
];

const pointsListTwo: PointItem[] = [
    { id: 4, label: 'Comprehensive Services' },
    { id: 5, label: 'Quality Assurance' },
    { id: 6, label: 'Customer Satisfaction' },
];

const progressItems: ProgressItem[] = [
    { id: 1, title: 'Active Users Product', percent: 76,},
    { id: 2, title: 'Skilled Professionals', percent: 90,},
    { id: 3, title: 'Replacment Device', percent: 92, },
    { id: 4, title: 'Repairing & Testing', percent: 85,},
];

const WhyChooseTwo: React.FC = () => {
    const { handleVideoClick } = useRsistoreContext()
    return (
        <section className="why-choose-two">
            <div className="why-choose-two__shape-2 rotate-me">
                <img src={whyChooseTwoShape2} alt="" />
            </div>
            <div className="why-choose-two__shape-3 rotate-me">
                <img src={whyChooseTwoShape3} alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <FadeInAdvanced
                            className="why-choose-two__left"
                            variant='slideInLeft'
                            delay={100}
                        >
                            <div className="why-choose-two__img-box">
                                <div className="why-choose-two__img-1">
                                    <img src={whyChooseTwoImg1} alt="" />
                                    <div className="why-choose-two__video-link">
                                        <Link
                                            to="#"
                                            className="video-popup"
                                            onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=Get7rqXYrbQ")}
                                        >
                                            <div className="why-choose-two__video-icon">
                                                <span className="icon-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="why-choose-two__improve-box">
                                    <p className="why-choose-two__improve-sub-title">(Based On 5K Reviews)</p>
                                    <h3 className="why-choose-two__title">Bring or Courier Device</h3>
                                    <p className="why-choose-two__improve-text">
                                        Improve gadget a/c smartphone<br /> laptop repair services.
                                    </p>
                                </div>
                                <div className="why-choose-two__shape-1"></div>
                            </div>
                        </FadeInAdvanced>
                    </div>
                    <div className="col-xl-6">
                        <div className="why-choose-two__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <h6 className="section-title__tagline">
                                    <span className="section-title__tagline-border"></span>Why Choose Us
                                </h6>
                                <h3 className="section-title__title title-animation">
                                    <TextAnimation>Trust An Electrician When You<br /> Don't Know What To Do</TextAnimation>
                                </h3>
                            </div>
                            <div className="why-choose-two__points-box">
                                {[pointsListOne, pointsListTwo].map((list, listIndex) => (
                                    <ul key={listIndex} className="why-choose-two__points-list list-unstyled">
                                        {list.map((point) => (
                                            <li key={point.id}>
                                                <div className="icon">
                                                    <span className="icon-check"></span>
                                                </div>
                                                <p>{point.label}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                            <div className="why-choose-two__progress-box">
                                <ul className="why-choose-two__progress-list list-unstyled">
                                    {progressItems.map((item) => (
                                        <Progresbar key={item.id} title={item?.title} value={item?.percent}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseTwo;