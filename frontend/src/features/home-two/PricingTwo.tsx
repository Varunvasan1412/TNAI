import React from 'react';
import { Link } from 'react-router';

import pricingTwoShape2 from '../../assets/images/shapes/pricing-two-shape-2.png';
import pricingTwoImg1 from '../../assets/images/resources/pricing-two-img-1.png';
import type { AnimationVariant } from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';

interface PricingFeature {
    id: number;
    label: string;
}

interface PricingPlan {
    id: number;
    planName: string;
    price: string;
    pricePeriod: string;
    features: PricingFeature[];
    to: string;
    animationClass: AnimationVariant;
    animationDelay: number;
    hasPremiumExtras?: boolean;
}

const defaultFeatures: PricingFeature[] = [
    { id: 1, label: 'AC replacement' },
    { id: 2, label: 'Air filter replacement' },
    { id: 3, label: 'Winning Metric for Your Startup' },
    { id: 4, label: '20% Off All Service' },
    { id: 5, label: '24/7 Supports' },
];

const pricingPlans: PricingPlan[] = [
    {
        id: 1,
        planName: 'Basic Plan',
        price: '$215.5',
        pricePeriod: 'Per Month',
        features: defaultFeatures,
        to: '/contact',
        animationClass: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        planName: 'Standard Plan',
        price: '$320.2',
        pricePeriod: '6 Month',
        features: defaultFeatures,
        to: '/contact',
        animationClass: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 3,
        planName: 'Premium Plan',
        price: '$450.3',
        pricePeriod: 'Annual',
        features: defaultFeatures,
        to: '/contact',
        animationClass: 'fadeInRight',
        animationDelay: 500,
        hasPremiumExtras: true,
    },
];

const PricingTwo: React.FC = () => {
    return (
        <section className="pricing-two">
            <div className="pricing-two__shape-2">
                <img src={pricingTwoShape2} alt="" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Pricing Plan
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Our Maintenance Perfect <br /> Pricing Plan.</TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    <div className="col-xl-9">
                        <div className="pricing-two__left">
                            <div className="row">
                                {pricingPlans.map((plan) => (
                                    <FadeInAdvanced
                                        key={plan.id}
                                        className={`col-xl-4 col-lg-4 col-md-6 `}
                                        variant={plan?.animationClass}
                                        delay={plan.animationDelay}
                                    >
                                        <div className="pricing-two__single">
                                            <div className="pricing-two__plan-box">
                                                <span>{plan.planName}</span>
                                            </div>
                                            <div className="pricing-two__price-box">
                                                <h3 className="pricing-two__price">{plan.price}</h3>
                                                <p className="pricing-two__price-sub-title">{plan.pricePeriod}</p>
                                            </div>
                                            <ul className="pricing-two__price-points list-unstyled">
                                                {plan.features.map((feature) => (
                                                    <li key={feature.id}>
                                                        <div className="icon">
                                                            <span className="icon-check"></span>
                                                        </div>
                                                        <p>{feature.label}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="pricing-two__btn-box">
                                                <Link to={plan.to} className="thm-btn">
                                                    Choose Package
                                                    <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            {plan.hasPremiumExtras && (
                                                <>
                                                    <div className="pricing-two__img-1">
                                                        <img src={pricingTwoImg1} alt="" />
                                                    </div>
                                                    <div className="pricing-two__shape-1"></div>
                                                </>
                                            )}
                                        </div>
                                    </FadeInAdvanced>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingTwo;