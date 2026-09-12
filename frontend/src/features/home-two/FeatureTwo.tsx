import React from 'react';
import { Link } from 'react-router';

import featureTwoShape1 from '../../assets/images/shapes/feature-two-shape-1.png';
import featureTwoSingleShape1 from '../../assets/images/shapes/feature-two-single-shape-1.png';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';

interface FeatureItem {
    id: number;
    iconClass: string;
    title: string;
    to: string;
    text: string;
    animationClass: AnimationVariant;
    animationDelay: number;
}

const featureItems: FeatureItem[] = [
    {
        id: 1,
        iconClass: 'icon-settings-1',
        title: 'Indoor Repairing',
        to: '/products',
        text: 'The wise man therefore always holds in these matters to this principle of',
        animationClass: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        iconClass: 'icon-ac',
        title: 'Dust Cleaning',
        to: '/products',
        text: 'The wise man therefore always holds in these matters to this principle of',
        animationClass: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 3,
        iconClass: 'icon-customer-support',
        title: 'Fixing And Installation',
        to: '/products',
        text: 'The wise man therefore always holds in these matters to this principle of',
        animationClass: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 4,
        iconClass: 'icon-affordable-price',
        title: 'No Upfront Payments',
        to: '/products',
        text: 'The wise man therefore always holds in these matters to this principle of',
        animationClass: 'fadeInUp',
        animationDelay: 600,
    },
];

const FeatureTwo: React.FC = () => {
    return (
        <section className="feature-two">
            <div className="feature-two__shape-1 rotate-me">
                <img src={featureTwoShape1} alt="" className="float-bob-y" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Features
                    </h6>
                    <h3 className="section-title__title title-animation"><TextAnimation animationStyle='style2'>Our Latest New And Articles</TextAnimation></h3>
                </div>
                <div className="row">
                    {featureItems.map((item) => (
                        <FadeInAdvanced 
                            key={item.id}
                            className={`col-xl-3 col-lg-6 col-md-6`}
                            variant={item?.animationClass}
                            delay={item.animationDelay}
                        >
                            <div className="feature-two__single">
                                <div className="feature-two__icon">
                                    <span className={item.iconClass}></span>
                                </div>
                                <div className="feature-two__content">
                                    <div
                                        className="feature-two__single-shape-1 float-bob-x"
                                        style={{ backgroundImage: `url(${featureTwoSingleShape1})` }}
                                    ></div>
                                    <h3 className="feature-two__title">
                                        <Link to={item.to}>{item.title}</Link>
                                    </h3>
                                    <p className="feature-two__text">{item.text}</p>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureTwo;