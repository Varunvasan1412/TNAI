import React from 'react';
import { Link } from 'react-router';
import TextAnimation from '../../components/elements/TextAnimation';
import type { SecProp } from './AboutOne';

interface PricingFeature {
    id: number;
    label: string;
}

interface PricingPlan {
    id: number;
    title: string;
    price: string;
    period: string;
    features: PricingFeature[];
    animation: string;
    animationDelay: string;
}

const pricingFeatures: PricingFeature[] = [
    { id: 1, label: 'Air filter replacement' },
    { id: 2, label: 'Thermostat replacement' },
    { id: 3, label: 'Clean condenser coil' },
    { id: 4, label: 'Contactor replacement' },
    { id: 5, label: 'AC fan replacement' },
];

const pricingPlans: PricingPlan[] = [
    {
        id: 1,
        title: 'Basic Plan',
        price: '$59.66',
        period: '/ Month',
        features: pricingFeatures,
        animation: 'fadeInLeft',
        animationDelay: '100ms',
    },
    {
        id: 2,
        title: 'Standard Plan',
        price: '$80',
        period: '/ Month',
        features: pricingFeatures,
        animation: 'fadeInUp',
        animationDelay: '300ms',
    },
    {
        id: 3,
        title: 'Premium Plan',
        price: '$140',
        period: '/ Month',
        features: pricingFeatures,
        animation: 'fadeInRight',
        animationDelay: '500ms',
    },
];

const PricingOne: React.FC<SecProp> = ({ secClass = "" }) => {
    return (
        <section className={`pricing-one ${secClass}`}>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Pricing Plan
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation animationStyle='style2'>Our Maintenance Cost</TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`col-xl-4 col-lg-4 ${plan.animation}`}
                            data-wow-delay={plan.animationDelay}
                        >
                            <div className="pricing-one__single">
                                <div className="pricing-one__title-box">
                                    <h3 className="pricing-one__title">{plan.title}</h3>
                                    <p className="pricing-one__price">
                                        {plan.price} <span>{plan.period}</span>
                                    </p>
                                </div>
                                <ul className="pricing-one__price-list list-unstyled">
                                    {plan.features.map((feature) => (
                                        <li key={feature.id}>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <p>{feature.label}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pricing-one__btn-box">
                                    <Link to="/contact" className="thm-btn">
                                        Choose Plan<span className="icon-arrow-right"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(PricingOne);