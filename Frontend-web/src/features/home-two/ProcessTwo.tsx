import React from 'react';

import processOneBg from '../../assets/images/backgrounds/process-one-bg.jpg';
import JarallaxSection from '../../components/elements/JarallaxSection';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';

interface ProcessItem {
    id: number;
    iconClass: string;
    title: string;
    text: string;
    isReversed: boolean;
    animationClass: AnimationVariant;
    animationDelay: number;
}

const processItems: ProcessItem[] = [
    {
        id: 1,
        iconClass: 'icon-ac1',
        title: 'Damage Device',
        text: 'Choose a Service: Like IT Support & Maintenance',
        isReversed: false,
        animationClass: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        iconClass: 'icon-send1',
        title: 'Send it to Us',
        text: 'Define Requirements: Like IT Support & Maintenance',
        isReversed: true,
        animationClass: 'fadeInLeft',
        animationDelay: 200,
    },
    {
        id: 3,
        iconClass: 'icon-settings-1',
        title: 'Repair Device',
        text: 'Request A Meeting: Like IT Support & Maintenance',
        isReversed: false,
        animationClass: 'fadeInRight',
        animationDelay: 100,
    },
    {
        id: 4,
        iconClass: 'icon-product-return',
        title: 'Quick Return',
        text: 'Finial Solution: Like IT Support & Maintenance',
        isReversed: true,
        animationClass: 'fadeInRight',
        animationDelay: 200,
    },
];

const ProcessTwo: React.FC = () => {
    return (
        <section className="process-one">
            <JarallaxSection imgSrc={processOneBg} className="process-one__bg jarallax" >
                <div className=""></div>
            </JarallaxSection>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Work Process
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Explore Our Effortless <br /> Work Process.</TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    {processItems.map((item) => (
                        <FadeInAdvanced
                            key={item.id}
                            className={`col-xl-3 col-lg-6 col-md-6`}
                            variant={item?.animationClass}
                            delay={item.animationDelay}
                        >
                            <div className={`process-one__single${item.isReversed ? ' process-one__single--two' : ''}`}>
                                {!item.isReversed && (
                                    <div className="process-one__icon-box">
                                        <div className="process-one__count"></div>
                                        <div className="process-one__icon">
                                            <span className={item.iconClass}></span>
                                        </div>
                                    </div>
                                )}
                                <div className="process-one__content">
                                    <h4 className="process-one__title">{item.title}</h4>
                                    <p className="process-one__text">{item.text}</p>
                                </div>
                                {item.isReversed && (
                                    <div className="process-one__icon-box">
                                        <div className="process-one__count"></div>
                                        <div className="process-one__icon">
                                            <span className={item.iconClass}></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessTwo;