import React from 'react';
import { Link } from 'react-router';

import servicesThreeShape1 from '../../assets/images/shapes/services-three-shape-1.png';
import servicesThreeShape2 from '../../assets/images/shapes/services-three-shape-2.png';
import TextAnimation from '../../components/elements/TextAnimation';
import type { AnimationVariant } from '../../components/elements/FadeInAdvanced';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface ServiceItem {
    id: number;
    icon: string;
    subTitle: string;
    title: string;
    text: string;
    path: string;
    animation: AnimationVariant;
    animationDelay: number;
}

const serviceItems: ServiceItem[] = [
    {
        id: 1,
        icon: 'icon-socket',
        subTitle: 'Service Type 1',
        title: 'Electric Repair',
        text: 'The wise man therefore always desi holds in these matters electri to this of principle selection',
        path: '/products',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        icon: 'icon-ceiling-lamp',
        subTitle: 'Service Type 2',
        title: 'Lighting & Fixtures',
        text: 'The wise man therefore always desi holds in these matters electri to this of principle selection',
        path: '/products',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 3,
        icon: 'icon-ceiling-lamp-2',
        subTitle: 'Service Type 3',
        title: 'Maintenance Service',
        text: 'The wise man therefore always desi holds in these matters electri to this of principle selection',
        path: '/products',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
];

const ServiceThree: React.FC = () => {
    return (
        <SectionWrapper id='services' className="services-three">
            <div className="services-three__shape-1">
                <img src={servicesThreeShape1} alt="Imge" />
            </div>
            <div className="services-three__shape-2 rotate-me">
                <img src={servicesThreeShape2} alt="image" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Services
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Current Solutions for Your<br /> Modern Problems</TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    {serviceItems.map((service) => (
                        <FadeInAdvanced
                            key={service.id}
                            className={`col-xl-4 col-lg-4`}
                            variant={service.animation}
                            delay={service.animationDelay}
                        >
                            <div className="services-three__single">
                                <div className="services-three__icon">
                                    <span className={service.icon}></span>
                                </div>
                                <p className="services-three__sub-title">{service.subTitle}</p>
                                <h3 className="services-three__title">
                                    <Link to={service.path}>{service.title}</Link>
                                </h3>
                                <p className="services-three__text">{service.text}</p>
                                <Link to={service.path} className="services-three__learn-more">
                                    Learn More<span className="icon-arrow-right"></span>
                                </Link>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default ServiceThree;