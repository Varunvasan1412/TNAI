import React from 'react';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import CounterUp from '../../components/elements/CounterUp';

interface CounterItem {
    id: number;
    icon: string;
    count: number;
    label: string;
    animation: AnimationVariant;
    extraClassName?: string;
}

const counterItems: CounterItem[] = [
    {
        id: 1,
        icon: 'icon-hands-on-experience',
        count: 20,
        label: 'Years of experience',
        animation: 'fadeInLeft',
        extraClassName: 'counter-two__single-1',
    },
    {
        id: 2,
        icon: 'icon-technician-1',
        count: 360,
        label: 'Expert Team Member',
        animation: 'fadeInUp',
    },
    {
        id: 3,
        icon: 'icon-project-complete',
        count: 800,
        label: 'Project Completed',
        animation: 'fadeInUp',
    },
    {
        id: 4,
        icon: 'icon-happy-customer',
        count: 760,
        label: 'Happy Customer',
        animation: 'fadeInRight',
    },
];

const CounterThree: React.FC = () => {
    return (
        <section className="counter-two">
            <div className="container">
                <div className="counter-two__inner">
                    <div className="row">
                        {counterItems.map((item) => (
                            <FadeInAdvanced
                                key={item.id}
                                className={`col-xl-3 col-lg-6 col-md-6 ${item.animation}`}
                                delay={100}
                                variant={item.animation}
                            >
                                <div className={`counter-two__single${item.extraClassName ? ` ${item.extraClassName}` : ''}`}>
                                    <div className="counter-two__icon">
                                        <span className={item.icon}></span>
                                    </div>
                                    <div className="counter-two__count-box">
                                        <h3 className="odometer" data-count={item.count}><CounterUp ending={item.count}/></h3>
                                        <span>+</span>
                                    </div>
                                    <p className="counter-two__text">{item.label}</p>
                                </div>
                            </FadeInAdvanced>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CounterThree;