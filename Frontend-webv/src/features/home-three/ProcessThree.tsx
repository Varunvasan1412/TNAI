import React from 'react';

import processTwoShape1 from '../../assets/images/shapes/process-two-shape-1.png';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';

interface ProcessItem {
    id: number;
    icon: string;
    title: string;
    text: string;
    animation: string;
}

const processItems: ProcessItem[] = [
    {
        id: 1,
        icon: 'icon-technician-1',
        title: 'Meet Our Team',
        text: 'Before beginning work, the electrician will typically meet with the client or manager to discuss about the project',
        animation: 'fadeInLeft',
    },
    {
        id: 2,
        icon: 'icon-settings-1',
        title: 'Get Estimation',
        text: 'If you are looking to get an estimate for your electrical project, our company is here to help. We understand that budgeting.',
        animation: 'fadeInRight',
    },
    {
        id: 3,
        icon: 'icon-smart-lighting',
        title: 'Start Your Project',
        text: 'If you are ready to start your electrical project, our company is here to help. We pride ourselves on delivering services.',
        animation: 'fadeInLeft',
    },
];

const ProcessThree: React.FC = () => {
    return (
        <section className="process-two">
            <FadeInAdvanced
                className="process-two__shape-1"
                variant='slideInLeft'
                delay={100}
            >
                <img src={processTwoShape1} alt="Decorative shape" className="float-bob-x" />
            </FadeInAdvanced>

            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Working Process
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation >We use the most effective methods<br /> to build a brand</TextAnimation>
                    </h3>
                </div>

                <div className="process-two__inner">
                    <ul className="list-unstyled row">
                        {processItems.map((item) => (
                            <li
                                key={item.id}
                                className={`col-xl-4 col-lg-4 ${item.animation}`}
                            >
                                <div className="process-two__single">
                                    <div className="process-two__count"></div>
                                    <div className="process-two__icon">
                                        <span className={item.icon}></span>
                                    </div>
                                    <h3 className="process-two__title">{item.title}</h3>
                                    <p className="process-two__text">{item.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProcessThree;